import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { format } from 'date-fns'

import StoreContext from 'libs/engines/data/store/StoreContext'
import Emoji from 'components/Emoji'
import UserNameLink from 'components/interface/UserNameLink'


class Edge extends Component {

  static contextType = StoreContext

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

  render = () => {
    const edge = this.context.store.get({
      edgeId: parseInt(this.props.location.pathname.replace('/edge/', ''))
    })
    
    if (typeof edge === "undefined")
    return <></>
    
    const node0 = this.context.store.get({ id: edge.node0 })
    const node1 = this.context.store.get({ id: edge.node1 })

    return (
      <div className="node-info">

        <UserNameLink
          user={node0}
          // emoji={node0.emoji}
          setNode={this.props.setNode}
        />
        <div
          className='edge-link'
        >
        <div className='ml-5'>
          ← {this.renderEmoji(edge)} →
        </div>
        </div>
        <UserNameLink
          user={node1}
          // emoji={node1.emoji}
          setNode={this.props.setNode}
        />
        
        <br />
        <br />
        {['published', 'told', 'commited']
          .map(dateType =>
            edge.hasOwnProperty(dateType) &&
              <div>
                {dateType}: {format(new Date(edge[dateType] * 1000), 'mm:HH dd.MM.yyyy')}
              </div>
        )}

      </div>
    )
  }
}

export default withRouter(Edge)