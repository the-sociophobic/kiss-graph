import React, { Component } from 'react'


export default class Select extends Component {
  constructor(props) {
    super(props)
  }

  render = () => (
    <div className={"custom-select " + this.props.className}>
      {
        [
          {value: undefined, label: "none"},
          ...this.props.options
        ].map(option => (
          <div
            className={"custom-select__option " + (this.props.value === option.value && "custom-select__option--selected")}
            key={option.value}
            onClick={() => this.props.onChange(option.value)}
          >
            {option.label}
          </div>  
        ))
      }
    </div>
  )
}