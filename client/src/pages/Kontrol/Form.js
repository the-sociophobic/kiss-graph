import React, { Component } from 'react'

import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import Select from 'components/Form/Select'
import DatePicker from 'components/Form/DatePicker'


export default class Form extends Component {
  constructor(props) {
    super(props)
  }

  renderKey = key => {
    const { model, state, setState } = this.props

    switch (model[key].type) {
      case "boolean":
        return (
          <Checkbox
            key={key}
            className="edit-node__checkbox"
            value={state[key]}
            onChange={value => setState({[key]: value})}
          >
            {key}
          </Checkbox>
        )
      case "select":
        return (
          <Select
            key={key}
            className="edit-node__select"
            value={state[key]}
            onChange={value => setState({[key]: value})}
            options={model[key].options}
            canBeUndefined={model[key].canBeUndefined}
            label={key}
          />
        )
      case "date":
        return (
          <DatePicker
            value={state[key]}
            onChange={value => setState({[key]: value})}
            label={key}
          />
        )
      default:
        return (
          <Input
            key={key}
            className="edit-node__input"
            value={state[key]}
            onChange={value => setState({[key]: value})}
            label={key}
          />
        )
    }
  }

  render = () =>
    Object.keys(this.props.model)
      .map(key => this.renderKey(key))
}