import React, { Component } from 'react'
import DefaultDropdown from './DefaultDropdown'
import InputDropdown from './InputDropdown'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
    }
    this.dropdownAreaRef = React.createRef()
    this.inputFieldRef = React.createRef()
  }

  externalAreaClick = e => {
    if (this.state.opened &&
        e.target.parentElement !== this.dropdownAreaRef.current &&
        e.target !== this.inputFieldRef.current)
      this.dropdownRef && this.dropdownRef.close()
  }

  componentDidMount() {
    window.addEventListener('click', this.externalAreaClick.bind(this))
  }
  componentWillUnount() {
    window.removeEventListener('click', this.externalAreaClick.bind(this))
  }

  render() {
    const opened = !this.props.disabled && this.state.opened

    return (
      <div
        className={"position-relative" + (this.props.disabled ? " universal-disabled": '')}
        ref={this.dropdownAreaRef}
      >
        {this.props.label &&
          <div className="form-group__label">
            {this.props.label}
          </div>
        }
        {this.props.input ?
            <InputDropdown
              ref={dropdown => this.dropdownRef = dropdown}
              {...this.props}
              opened={opened}
              setOpened={value => this.setState({opened: value})}
              inputFieldRef={this.inputFieldRef}
            />
          :
            <DefaultDropdown
              ref={dropdown => this.dropdownRef = dropdown}
              {...this.props}
              opened={opened}
              setOpened={value => this.setState({opened: value})}
              inputFieldRef={this.inputFieldRef}
            />
        }
      </div>
    )
  } 
}