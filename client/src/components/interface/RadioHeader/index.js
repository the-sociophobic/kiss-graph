import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import './index.sass'


class RadioHeader extends Component {
  constructor(props) {
    super(props)

    let options = Object.keys(props.options)
    let currentOption = options[0]

    if (props.initialOption && options.includes(props.initialOption))
      currentOption = props.initialOption
    if (props.initialOptionFromURL) {
      let URLparams = props.location.pathname.split('/')
      let matchingURLparams = URLparams.filter(param => options.includes(param))

      if (matchingURLparams.length > 0)
        currentOption = matchingURLparams[0]
    }

    this.state = {
      currentOption: currentOption
    }
  }

  componentDidMount = () => this.switchOption(this.state.currentOption)

  static getDerivedStateFromProps = (props, state) => {
    if (props.affectURL) {
      let options = Object.keys(props.options)
      let URLparams = props.location.pathname.split('/')
      let matchingURLparams = URLparams.filter(param => options.includes(param))
      if (matchingURLparams.length > 0)
        state.currentOption = matchingURLparams[0]
    }
  }

  switchOption = option => {
    this.setState({currentOption: option})

    const newURL = (this.props.prevURL || "") + option
    if (this.props.affectURL && newURL !== this.props.location.pathname) {
      this.props.history.push(newURL)
    }
    if (this.props.options[option].title)
      document.title = this.props.options[option].title
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
              className={"radio-header__option " + (this.state.currentOption === key && "radio-header__option--selected")}
              onClick={() => this.switchOption(key)}
            >
              {label}
            </div>
        )})}
      </div>
      {this.props.options[this.state.currentOption].content()}
    </Fragment>
  )
}

export default withRouter(RadioHeader)