import React, { Component, Fragment } from 'react'
import './index.sass'

export default class RadioHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: props.initialKey || Object.keys(props.options)[0]
    }
  }
  render = () => (
    <Fragment>
      <div className="radio-header__container">
        {Object.keys(this.props.options).map(key => {
          const option = this.props.options[key]
          const label = typeof option === "string" ? option : option.label()

          return (
            <div
              key={key}
              className={"radio-header__option " + (this.state.currentKey === key && "radio-header__option--selected")}
              onClick={() => this.setState({currentKey: key})}
            >
              {label}
            </div>
        )})}
      </div>
      {this.props.options[this.state.currentKey].content()}
    </Fragment>
  )
}