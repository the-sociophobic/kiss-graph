import React, { Component } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import Emoji from 'components/Emoji'


export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static contextType = StoreContext

  render = () => {
    const { node } = this.props

    if (typeof node === "undefined")
      return <div></div>

    return (
      <div className="node-info">
        {Object.keys(node)
          .filter(key =>
            ["gender", "homosexuality", "mentalDisorder", "iq"]
            .includes(key)
            &&
            typeof node[key] !== "undefined"
          )
          .map(key =>
            <div
              key={key}
              className="node-info__item"
            >
              {({
                  mentalDisorder: () => <Emoji.mentalDisorder />,
                  iq: () => <Emoji.IQ />,
                })[key]()
              } {node[key]}
              {key === "mentalDisorder" && "/10 mentalDisorder"}
              {key === "iq" && " IQ"}
            </div>)
        }
        <div className="node-info__item">
          <Emoji.kiss /> {node.connections}{node.hiddenConnections ? <> ({node.hiddenConnections}<Emoji.hidden />)</> : ""}:
        </div>
        <div className="node-info__connections">
          <List items={node.mates
            .map(connection => ({
              ...this.context.store.get({name: connection.name}),
              date: connection.date,
            }))
            .sort((a, b) => b.connections - a.connections)
            .map(connection =>
              [<UserNameLink
                key={connection.userName || connection.name}
                user={connection}
                setNode={this.props.setNode}
                date={connection.date}
              />]
            )}
          />
        </div>
      </div>
    )
  }
}