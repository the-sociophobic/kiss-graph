import React, { Component } from 'react'


export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render = () => {
    const { node } = this.props

    if (typeof node === "undefined")
      return <div></div>

    return (
      <div className="node-info">
        {Object.keys(node)
          .filter(key =>
            ["gender", "connections", "homosexuality", "mentalDisorder", "iq"]
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
      </div>
    )
  }
}