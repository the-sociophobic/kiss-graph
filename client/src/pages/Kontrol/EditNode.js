import React, { Component } from 'react'

import Input from 'components/Form/Input'

// import model from './model'


class EditNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.node,
      prevProp: this.props.node,
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (state.prevProp !== props.node) {
      state = {
        ...props.node,
        prevProp: props.node
      }
      return state
    }

    return null
  }

  render = () => (
    <div className="">
      {Object.keys(this.props.node || {}).map(key => (
        <Input
          className="mb-3"
          value={this.state[key]}
          onChange={value => this.setState({[key]: value})}
          label={key}
        />
      ))}
      <button
        className="button"
        onClick={this.props.saveNode(this.state)}
      >
        Save
      </button>
    </div>
  )
}

export default EditNode
