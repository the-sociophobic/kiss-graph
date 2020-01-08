import React, { Component } from 'react'

import Dropdown from 'components/Form/Dropdown'
import StoreContext from 'libs/engines/data/store/StoreContext'


class NameSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
    }
    this.dropdownRef = React.createRef()
  }

  updateOptions = value => {
    if (typeof value === "undefined" || value.length === 0)
      this.setState({currentOptions: []})
    else {
      const options = this.context.store.search({name: value, userName: value})
        .slice(0, window.innerHeight > 736 ? 7 : 5)
        .map(option => ({
          value: option.name,
          style: {':hover': {
            backgroundColor: `var(--weight-color-${option.connections})`,
          }},
          render: <p className="p">
              {option.name} <em>{option.userName ? ` (@${option.userName})` : ""}</em>
            </p>
        }))
      this.setState({currentOptions: options})
    }
  }

  close = () => this.dropdownRef.current && this.dropdownRef.current.close()

  render = () => (
    <Dropdown
      ref={this.dropdownRef}
      input
      value={(this.props.node && this.props.node.name) || ""}
      options={this.state.currentOptions}
      updateOptions={value => this.updateOptions(value)}
      onChange={value => this.props.onChange(value)}
      placeholder="Search..."
      showReset
      onKeyDown={this.props.onKeyDown}
      className={this.props.className}
    />
  )
}

NameSearch.contextType = StoreContext

export default NameSearch