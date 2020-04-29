import React, { Component } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
import RadioHeader from 'components/interface/RadioHeader'
import UserNameLink from 'components/interface/UserNameLink'
import KissTime from 'components/interface/Feed/KissTime'
import Emoji, { EmojiByName } from 'components/Emoji'
import myDate from 'libs/utils/myDate'
import { insertIntoSortedArray } from 'libs/utils/sort'
import isProduction from '../../../libs/utils/isProduction'


const minItemsShown = 50
const itemsOffset = 50

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.options = ["published", "told", "commited"]
    this.optionsEmoji = {
      told: "told",
      published: "world",
      commited: "kiss",
    }

    this.edgesArraysByOption = this.options
      .map(option => ({[option]: []}))
      .reduce((a, b) => ({...a, ...b}))

    this.state = {
      ...this.options.map(option => ({[option + "Shown"]: minItemsShown}))
        .reduce((a, b) => ({...a, ...b}))
    }
  }

  static contextType = StoreContext

  componentDidMount() {
    const edges = this.context.store.get().edges.filter(edge => edge.type !== "SEX" || !isProduction())

    edges.forEach(edge =>
      this.options.forEach(option => {
        if (edge.hasOwnProperty(option))
          insertIntoSortedArray(this.edgesArraysByOption[option], edge, (a, b) => a[option] - b[option])
      }))
    
    this.options.forEach(option =>
      this.setState({
        [option]: this.slowEdgesParser(
          this.edgesArraysByOption[option]
            .slice(0, minItemsShown)
          , option)
    }))
  }

  slowEdgesParser = (edges, type) => {
    const mapNodesToEdges = edges => edges
      .map(edge => {
        const node0 = this.context.store.get({id: edge.node0})
        const node1 = this.context.store.get({id: edge.node1})

        return {
          ...edge,
          node0: {
            id: node0.id,
            name: node0.name,
            userName: node0.userName,
            link: node0.link,
            connections: node0.connections,
          },
          node1: {
            id: node1.id,
            name: node1.name,
            userName: node1.userName,
            link: node1.link,
            connections: node1.connections,
          },
        }
      })

    const groupByDays = (edges, type) => {
      let days = []

      edges.forEach(edge => {
        const date = new myDate(edge[type]).toStringDot()
        let dayIndex = days.map(day => day.date).indexOf(date)

        if (dayIndex === -1) {
          days.push({
            date: date,
            entries: [],
          })
          dayIndex = days.length - 1
        }

        days[dayIndex].entries.push(edge)
      })

      return days
    }

    return groupByDays(mapNodesToEdges(edges), type)
  }

  renderEmoji = edge => {
    switch (edge.type) {
      case "DATE":
        return <Emoji.heart />
      case "BREAKUP":
        return <Emoji.heartBroken />
      case "DEBATED":
        return <Emoji.womanBan />
      case "MARRIED":
        return <Emoji.married />
      case "SEX":
        return <Emoji.sex />
      default:
        return <Emoji.kiss />
    }
  }
  renderKisses = type => this.state[type] && this.state[type]
    .map(day => (
      <div
        key={day.date}
        className="kiss-day"
      >
        <div className="kiss-day__date">
          {day.date}
        </div>
        <div className="kiss-day__entries">
          {day.entries.map(entry => (
            <div
              key={entry.id}
              className="kiss-day__entries__item"
            >
              <KissTime
                date={entry[type]}
                className="kiss-day__entries__item__time"
              />
              <UserNameLink
                simple
                user={entry.node0}
                setNode={this.props.setNode}
              />
              {this.renderEmoji(entry)}
              <UserNameLink
                simple
                user={entry.node1}
                setNode={this.props.setNode}
              />
            </div>
          ))}
        </div>
      </div>
    ))

  renderShowMore = type => (
    <button
      className="button--load-more"
      onClick={() => {
        const currentArray = this.state[type]
        const currentlyShown = this.state[type + "Shown"]
        const additionalArray = this.slowEdgesParser(
          this.edgesArraysByOption[type]
            .slice(currentlyShown, currentlyShown + itemsOffset)
          , type)
        let mergedArray

        if (currentArray[currentArray.length - 1].date === additionalArray[0].date) {
          mergedArray = [
            ...(currentArray.length > 1 ? currentArray.slice(0, -1) : []), //surprisingly .slice() doesn't return []
            {
              date: additionalArray[0].date,
              entries: [
                ...currentArray[currentArray.length - 1].entries,
                ...additionalArray[0].entries,
              ]
            },
            ...(additionalArray.length > 1 ? additionalArray.slice(-1) : [])
          ]
        } else 
          mergedArray = [
            ...currentArray,
            ...additionalArray
          ]
          
          this.setState({
            [type]: mergedArray,
          [type + "Shown"]: currentlyShown + itemsOffset
        })
      }}
    >
      Load more
    </button>
  )

  render = () => (
    <RadioHeader
      initialOptionFromURL
      affectURL
      prevURL="/news/"
      options={
        this.options
          .map(option => ({[option]: {
            title: "Kiss Graph: News / " + option,
            label: () => <>{option}<EmojiByName name={this.optionsEmoji[option]} /></>,
            content: () => <>
              {this.renderKisses(option)}
              {this.state[option + "Shown"] < this.edgesArraysByOption[option].length &&
                this.renderShowMore(option)
              }
            </>,
          }}))
          .reduce((a, b) => ({...a, ...b}))
      }
    />
  )
}