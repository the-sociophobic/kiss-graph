import React, { Component } from 'react'

import Dropdown from 'components/Form/Dropdown'

import { registerListeners, unregisterListeners } from 'libs/utils/preventMobileScrolling'


export default class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
    }
    this.interfaceRef = new React.createRef()
  }

  componentDidMount() {
    registerListeners(this.interfaceRef.current)
  }
  componentWillUnmount() {
    unregisterListeners(this.interfaceRef.current)
  }

  setNode = nodeName => {
    if (nodeName.length > 0)
      this.updateOptions(nodeName)
    const node = this.props.data.store.get({name: nodeName})

    if (node === null)
      this.props.setNode()
    else
      this.props.setNode(node.id)
  }

  updateOptions = value => {
    console.log("upd: " + value)
    if (typeof value === "undefined" || value.length === 0)
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
        }
      </div>
    )
  }
}