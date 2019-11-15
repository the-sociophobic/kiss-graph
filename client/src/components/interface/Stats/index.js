import React, { Component } from 'react'

import RadioHeader from 'components/interface/RadioHeader'
import Emoji from 'components/Emoji'
import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'


class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  renderKisses = () => (
    <List
      items={this.context.store.get().nodes
        .filter(node => node.connections > 5)
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

  render = () => (
    <RadioHeader options={{
      kisses: {
        label: () => <>kisses <Emoji.kiss /></>,
        content: () => this.renderKisses()
      },
      stats: {
        label: () => <>IQ <Emoji.IQ /></>,
        content: () => this.renderIQ()
      },
    }} />
  )
}
Menu.contextType = StoreContext
export default Menu