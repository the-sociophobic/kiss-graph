import React, { Component } from 'react'
import Radium from 'radium'


class DefaultDropdown extends Component {
  close = () => this.props.setOpened(false)

  renderOptions = () => this.props.options
    .map((option, index) => {
      const style = option.style || {}
      
      return (
        <div
          key={index}
          className="form-group__input--dropdown__options__item"
          style={style}
          onClick={() => {
            this.props.setValue(option)
            this.setState({opened: false})
          }}
        >
          {(this.props.valueRender && this.props.valueRender(option)) || option}
        </div>
      )
    })

  render = () => (
    <div
      className={"form-group__input form-group__input--dropdown " + (this.props.opened ? "active": '')}
      onClick={() => this.props.setOpened(true)}
    >
      {(this.props.valueRender && this.props.value && this.props.valueRender(this.props.value)) ||
        this.props.value || this.props.placeholder}
      <div className="form-group__input--dropdown__options form-group__input--dropdown__options--default">
        {this.props.opened && this.renderOptions()}
      </div>
    </div>
  )
}

export default Radium(DefaultDropdown)