import React, { Component } from 'react'


export default class Select extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    let { options, canBeUndefined } = this.props
    if (canBeUndefined)
      options = [{value: undefined, label: "none"}, ...options]

    return (
      <div className={"my-select " + this.props.className}>
        {options
          .map(optionIn => typeof optionIn === "string" ? ({value: optionIn, label: optionIn}) : optionIn)
          .map(option => 
            <div
              className={"my-select__option " + (this.props.value === option.value && "my-select__option--selected")}
              key={option.label}
              onClick={() => this.props.onChange(option.value)}
            >
              {option.label}
            </div>  
        )}
      </div>
  )}
}