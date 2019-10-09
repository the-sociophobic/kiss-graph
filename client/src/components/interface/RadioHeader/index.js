import React, { Component } from 'react'
import './index.sass'

export default class Feed extends Component {
  render = () => (
    <div className="radio-header__container">
      {this.props.options.map(option => {
        const label = typeof option === "string" ? option : option.label
        const key = typeof option === "string" ? option : option.key
        return (
          <div
            key={key}
            className={"radio-header__option " + (this.props.value === key && "radio-header__option--selected")}
            onClick={() => this.props.onChange(key)}
          >
            {label}
          </div>
      )})}
    </div>
  )
}