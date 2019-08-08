import React, { Component } from 'react'
// import ExpandingErrorBox from 'components/ExpandingErrorBox'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  focus = () => this.inputRef.current && this.inputRef.current.focus()
  blur = () => this.inputRef.current && this.inputRef.current.blur()

  render = () => (
    <div
      className={"form-group " +
        this.props.className + " " +
        (this.props.errorMessage && "form-group--error")
      }
    >
      <div className="relative">
        <input
          ref={this.inputRef}
          className="form-group__input"
          value={this.props.value}
          onChange={event => this.props.onChange(event.target.value)}
          placeholder={this.props.placeholder}
        />
        <label className="form-group__label">{this.props.label}</label>
        {this.props.showReset && this.props.value.length > 0 &&
          <div
            className="reset"
            onClick={() => {
              this.inputRef.current.focus()
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
