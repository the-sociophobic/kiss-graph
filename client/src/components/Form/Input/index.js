import React, { Component } from 'react'

import _ from 'lodash'


export default class Input extends Component {
  constructor(props) {
    super(props)
    this.inputFieldRef = props.inputFieldRef || React.createRef()
  }

  focus = () => this.inputFieldRef.current && this.inputFieldRef.current.focus()
  blur = () => this.inputFieldRef.current && this.inputFieldRef.current.blur()

  onKeyDown = e => {
    if (this.props.number)
      if (this.props.value.match(/[^0-9]/g))
        this.props.onChange(this.props.value.replace(/[^0-9]/g, ''))
    this.props.onKeyDown && this.props.onKeyDown(e)
  }
  onBlur = e => {
    if (this.props.number && this.props.range)
      if (!_.inRange(this.props.value, this.props.range))
        this.props.onChange(undefined)
    this.props.onBlur && this.props.onBlur(e)
  }

  render = () => (
    <div
      className={"form-group " +
        this.props.className + " " +
        (this.props.errorMessage && "form-group--error")
      }
    >
      <div className="position-relative">
        <input
          ref={this.inputFieldRef}
          type={this.props.number ? "number" : "text"}
          className="form-group__input"
          placeholder={this.props.placeholder}
          required={this.props.required}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
          onFocus={this.props.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          disabled={this.props.disabled}
        />
        <label className="form-group__label">
          {this.props.label}
        </label>
        {this.props.showReset && this.props.value.length > 0 &&
          <div
            className="reset"
            onClick={() => {
              this.focus()
              this.props.onChange("")
            }}
          />
        }
      </div>
      {/* <ExpandingErrorBox>
        {this.props.errorMessage}
      </ExpandingErrorBox> */}
    </div>
  )
}
