import React, { Component } from 'react'

import Dropdown from 'components/Form/Dropdown'
import colorFromWeight from 'libs/utils/colorFromWeight'
import StoreContext from 'libs/engines/data/store/StoreContext'


class NameSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
    }
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
            backgroundColor: colorFromWeight(option.uv, "light"),
          }},
          render: <p className="p">
              {option.name} <em>{option.userName ? ` (@${option.userName})` : ""}</em>
            </p>
        }))
      this.setState({currentOptions: options})
    }
  }

  render = () => (
    <Dropdown
      input
      value={(this.props.nodeToShow && this.props.nodeToShow.name) || ""}
      options={this.state.currentOptions}
      updateOptions={value => this.updateOptions(value)}
      onChange={value => this.props.setNode(value)}
      placeholder="Search..."
      showReset
      onKeyDown={this.props.onKeyDown}
      className={this.props.className}
    />
  )
}

NameSearch.contextType = StoreContext

export default NameSearch