import React, { Component } from 'react'

import RadioHeader from 'components/interface/RadioHeader'
import Emoji from 'components/Emoji'
import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'


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

  render = () => (
    <RadioHeader
      initialOptionFromURL
      affectURL
      prevURL="/stats/"
      options={{
        kisses: {
          label: () => <>kisses<Emoji.kiss /></>,
          content: () => this.renderKisses(),
          title: "Kiss Graph: Stats / kisses",
        },
        iq: {
          label: () => <>IQ<Emoji.IQ /></>,
          content: () => this.renderIQ(),
          title: "Kiss Graph: Stats / IQ",
        },
        mental: {
          label: () => <>mentalDisorder<Emoji.mentalDisorder /></>,
          content: () => this.renderMentalDisorder(),
          title: "Kiss Graph: Stats / mental disorders",
        },
      }}
    />
  )
}
Stats.contextType = StoreContext
export default Stats