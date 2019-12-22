import React, { Component } from 'react'

import RadioHeader from 'components/interface/RadioHeader'
import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import KissTime from 'components/interface/Feed/KissTime'
import Emoji from 'components/Emoji'
import myDate from 'libs/utils/myDate'


export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.options = ["told", "published", "commited"]
  }

  static contextType = StoreContext

  componentDidMount() {
    const filterEdgesByProperty = (edges, prop) => edges
      .filter(edge => edge[prop])
    
    const mapNodesToEdges = edges => edges
      .map(edge => {
        const node0 = this.context.store.get({name: edge.node0})
        const node1 = this.context.store.get({name: edge.node1})

        return {
          ...edge,
          node0: {
            id: node0.id,
            name: node0.name,
            userName: node0.userName,
            link: node0.link,
            color: node0.color.dark,
          },
          node1: {
            id: node1.id,
            name: node1.name,
            userName: node1.userName,
            link: node1.link,
            color: node1.color.dark,
          },
        }
      })

    const groupByDays = (edges, prop) => {
      const sortedEdges = edges
        .sort((a, b) => b[prop] - a[prop])

      let days = []

      sortedEdges.forEach(edge => {
        const date = new myDate(edge[prop]).toStringDot()
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

    const { edges } = this.context.store.get()

    this.options.forEach(option => {
      this.setState({[option]: groupByDays(mapNodesToEdges(filterEdgesByProperty(edges, option)), option)})
    })
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
              <Emoji.kiss />
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

  render = () => (
    <RadioHeader
      initialOptionFromURL
      affectURL
      prevURL="/news/"
      options={{
        told: {
          label: () => <>told<Emoji.told /></>,
          content: () => this.renderKisses("told"),
          title: "Kiss Graph: News / told",
        },
        published: {
          label: () => <>published<Emoji.world /></>,
          content: () => this.renderKisses("published"),
          title: "Kiss Graph: News / published",
        },
        commited: {
          label: () => <>commited<Emoji.kiss /></>,
          content: () => this.renderKisses("commited"),
          title: "Kiss Graph: News / commited",
        },
      }}
    />
  )
}