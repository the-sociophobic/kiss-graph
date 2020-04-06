import React, { Component } from 'react'

import RadioHeader from 'components/interface/RadioHeader'
import Emoji from 'components/Emoji'
import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import { genderDetermined } from 'libs/engines/data/hardcoded/meta/namesRecognition'


class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  renderKisses = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.connections >= 2)
        .sort((a, b) => b.connections - a.connections)
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderIQ = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.iq)
        .sort((a, b) => (typeof b.iq !== "number" ? 0 : b.iq) - (typeof a.iq !== "number" ? 0 : a.iq))
        .map(node => [
          <UserNameLink
            IQ
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderMentalDisorder = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.mentalDisorder)
        .sort((a, b) => (typeof b.mentalDisorder !== "number" ? 0 : b.mentalDisorder) - (typeof a.mentalDisorder !== "number" ? 0 : a.mentalDisorder))
        .map(node => [
          <UserNameLink
            mentalDisorder
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderDead = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.dead)
        .sort((a, b) => b.connections - a.connections)
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderTriggered = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.offended)
        .sort((a, b) => b.connections - a.connections)
        .map(node => [
          <UserNameLink
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderGay = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.gay && node.mates.length > 4)
        .sort((a, b) => b.gay - a.gay)
        .map(node => [
          <UserNameLink
            gay
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  renderGenderless = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => !genderDetermined(node))
        .map(node => [
          <UserNameLink
            gay
            user={node}
            setNode={this.props.setNode}
          />
        ])
      }
    />
  )

  render = () => (
    <RadioHeader
      initialOptionFromURL
      affectURL
      prevURL="/stats/"
      options={{
        kisses: {
          label: () => <><Emoji.kiss /></>,
          content: () => this.renderKisses(),
          title: "Kiss Graph: Stats / kisses",
        },
        iq: {
          label: () => <>IQ<Emoji.IQ /></>,
          content: () => this.renderIQ(),
          title: "Kiss Graph: Stats / IQ",
        },
        mental: {
          label: () => <>MD<Emoji.mentalDisorder /></>,
          content: () => this.renderMentalDisorder(),
          title: "Kiss Graph: Stats / mental disorders",
        },
        triggered: {
          label: () => <><Emoji.triggered /></>,
          content: () => this.renderTriggered(),
          title: "Kiss Graph: Stats / triggered",
        },
        gay: {
          label: () => <><Emoji.gay /></>,
          content: () => this.renderGay(),
          title: "Kiss Graph: Stats / gay",
        },
        dead: {
          label: () => <><Emoji.dead /></>,
          content: () => this.renderDead(),
          title: "Kiss Graph: Stats / dead",
        },
        // genderless: {
        //   label: () => <><Emoji.gay /></>,
        //   content: () => this.renderGenderless(),
        //   title: "Kiss Graph: Stats / genderless",
        // },
      }}
    />
  )
}
Stats.contextType = StoreContext
export default Stats