import React, { Component } from 'react'

import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import DatePicker from 'components/Form/DatePicker'


export default class Form extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  renderField = key => {
    const field = this.props.fields[key]
    const { value, onChange, type } = field

    switch (type) {
      case "object":
        return (
          Object.keys(value)
            .map(keyKey =>
              <Input
                key={key + keyKey}
                className="custom-form__input"
                value={value[keyKey]}
                onChange={value => onChange({
                  ...value,
                  [keyKey]: value
                })}
                label={`${key}: ${keyKey}`}
              />
            )
        )
      case "boolean":
        return (
          <Checkbox
            key={key}
            value={value}
            onChange={value => onChange(value)}
          >
            {key}
          </Checkbox>
        )
      case "date":
        return (
          <DatePicker
            key={key}
            value={value}
            onChange={onChange}
            label={key}
          />
        )  
      default:
        return (
          <Input
            key={key}
            value={value}
            onChange={value => onChange(value)}
            className="custom-form__input"
            label={key}
          />
        )
    }
  }

  render = () => (
    <form className={"custom-form " + this.props.className}>
      {Object.keys(this.props.fields)
        .map(key => renderField(key))
      }
    </form>
  )
}