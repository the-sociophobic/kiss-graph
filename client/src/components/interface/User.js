import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { nameToPath } from 'libs/utils/stringTransforms'

import StoreContext from 'libs/engines/data/store/StoreContext'

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
              {key}: {node[key]}
            </div>)
        }
        <div className="node-info__item">
          {node.connections} connections{node.hiddenConnections ? (" (" + node.hiddenConnections + " hidden)") : ""}:
        </div>
        <div className="node-info__connections">
          {node.mates
            .map(connection => this.context.store.get({name: connection}))
            .sort((a, b) => b.connections - a.connections)
            .map(connection => (
              <div
                className="node-info__connections__item"
                key={connection.name}
                style={{color: connection.color}}
              >
                <div className="node-info__connections__item__number">
                  {connection.connections}
                </div>
                <div className="node-info__connections__item__name">
                  <Link
                    to={nameToPath(connection.userName || connection.name)}
                    onClick={() => this.props.setNode(connection.name)}
                  >
                    {connection.name}
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
    )
  }
}