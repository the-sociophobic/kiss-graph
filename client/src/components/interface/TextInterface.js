import React, { Component } from 'react'

import Input from 'components/Form/Input'
import Dropdown from 'components/Form/Dropdown'

export default class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
    }
    this.interfaceRef = new React.createRef()
  }

  componentDidMount() {
    this.interfaceRef.current.addEventListener( 'wheel', e => e.preventDefault(), { passive: false } )
  }

  setNode = nodeName => {
    this.updateOptions(nodeName)
    const node = this.props.data.store.get({name: nodeName})
    this.props.setNode(node.id)
  }

  updateOptions = value => {
    if (value.length === 0)
      this.setState({currentOptions: []})
    else {
      const options = this.props.data.store.search({name: value, userName: value})
        .slice(0, 5)
        // .map(option => option.name + (option.userName ? ` (@${option.userName})` : ""))
        .map(option => option.name)
      this.setState({currentOptions: options})
    }
  }

  render = () => {
    const { node } = this.props
    return (
      <div
        ref={this.interfaceRef}
        className="text-interface"
      >
        <div className="text-interface__search-bar">
          {/* <Input */}
          <Dropdown
            input
            value={(this.props.nodeToShow && this.props.nodeToShow.name) || ""}
            options={this.state.currentOptions}
            updateOptions={value => this.updateOptions(value)}
            onChange={value => this.setNode(value)}
            placeholder="Search..."
            showReset
          />
        </div>
        {typeof node !== "undefined" &&
          <div>
            {Object.keys(node)
              .filter(key =>
                ["gender", "connections", "homosexuality", "mentalDisorder", "iq"]
                .includes(key)
                &&
                typeof node[key] !== "undefined"
              )
              .map(key => <div key={key}>{key}: {node[key]}</div>)
            }
          </div>
        }
      </div>
    )
  }
}