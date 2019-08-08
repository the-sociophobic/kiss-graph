import React, { Component } from 'react'

import Input from 'components/Form/Input'

export default class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: "",
    }
  }

  render = () => {
    const { node } = this.props
    return (
      <div className="text-interface">
        <div className="text-interface__search-bar">
          <Input
            value={this.state.searchString}
            onChange={value => this.setState({searchString: value})}
            placeholder="Search..."
            showReset
          />
        </div>
        {typeof node !== "undefined" &&
          <div>
            <div>
              name: {node.name}
            </div>
            <div>
              gender: {node.gender ? node.gender : "unknown"}
            </div>
            <div>
              connections: {node.connections}
            </div>
            <div>
              homosexuality: {node.kinsey ? node.kinsey : "unknown"}
            </div>
            <div>
              iq: {node.iq ? node.iq : "unknown"}
            </div>
            <div>
              mental disorder: {node.mentalDisorder ? node.mentalDisorder * 10 + "%" : "unknown"}
            </div>
          </div>
        }
      </div>
    )
  }
}