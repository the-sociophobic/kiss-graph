import React, { Component } from 'react'
// import ExpandingErrorBox from 'components/ExpandingErrorBox'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.inputFieldRef = props.inputFieldRef || React.createRef()
  }

  focus = () => this.inputFieldRef.current && this.inputFieldRef.current.focus()
  blur = () => this.inputFieldRef.current && this.inputFieldRef.current.blur()

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
          type="text"
          className={"form-group__input " + this.props.className}
          placeholder={this.props.placeholder}
          required={this.props.required}
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
          onFocus={this.props.onFocus}
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
