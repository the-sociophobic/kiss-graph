import React, { Component, Fragment } from 'react'
import Radium from 'radium'

import Input from 'components/Form/Input'


class InputDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typedValue: this.props.value,
      neverTypedFlag: true,
      oldPropValue: this.props.value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.oldPropValue !== props.value) {
      state.oldPropValue = props.value

      if (props.value !== state.typedValue) {// &&
          // props.value !== null &&
          // props.value !== "" &&
          // typeof props.value !== "undefined") {
        state.typedValue = props.value
        state.neverTypedFlag = false

        if (props.required) {
          props.updateOptions && props.updateOptions(props.value)
          props.setOpened(true)
        }
      }
    }

    return state
  }

  close = () => {
    this.props.setOpened(false)
    this.props.inputFieldRef && this.props.inputFieldRef.current.blur()
  }

  onChange = value => {
    if (value === null) {
      this.setState({typedValue: ""})
      this.props.onChange("")
      return
    }
    this.setState({neverTypedFlag: false})
    this.setState({typedValue: value})
    this.props.updateOptions && this.props.updateOptions(value)
    if (value === "" && !this.props.keepValue)
      this.props.onChange("")
  }

  setValue = value => {
    this.setState({typedValue: value})
    this.props.onChange(value)
  }

  onFocus = () => {
    this.props.updateOptions && this.props.updateOptions(this.state.typedValue)
    this.props.setOpened(true)
  }
  onBlur = () => this.setState({neverTypedFlag: true})

  renderOptions = () => //(this.props.value !== this.state.typedValue) &&
    this.props.options && this.props.options
      .map((option, index) => {
        const style = option.style || {}

        return (
          <div
            key={index}
            style={style}
            className="form-group__input--dropdown__options__item"
            onClick={() => this.setValue(typeof option === "string" ? option : option.value)}
          >
            {typeof option === "string" ? option : option.render}
          </div>
        )
      })

  render = () => (
    <Fragment>
      <Input
        inputFieldRef={this.props.inputFieldRef}
        //somehow it blurs input on iOS
        className={"form-group__input--dropdown " + this.props.className}
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={(this.state.neverTypedFlag && this.props.value) || this.state.typedValue}
        onChange={value => this.onChange(value)}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        disabled={this.props.disabled}
        showReset={this.props.showReset}
        onKeyDown={this.props.onKeyDown}
      />
      <div className={"form-group__input--dropdown__options " + (this.props.relativeOptionsList && "position-relative")}>
        {this.props.opened && this.renderOptions()}
      </div>
    </Fragment>
  )
}

export default Radium(InputDropdown)