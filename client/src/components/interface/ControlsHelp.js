import React, { Component, Fragment } from 'react'
import isTouchDevice from 'libs/utils/isTouchDevice'


export default class ControlsHelp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      click: false,
      shift: false,
      scroll: false,
      oneFinger: false,
      twoFinger: false,
      zoom: false,
    }
  }

  componentDidMount() {
    window.addEventListener( 'keydown', e => e.shiftKey && this.setState({shift: true}))
    window.addEventListener( 'keyup', e => !e.shiftKey && this.setState({shift: false})  )

    let threeElem = document.getElementsByClassName("Viewer")
    threeElem = threeElem && threeElem[0]
    if (threeElem) {
      threeElem.addEventListener( 'wheel', () => this.onScroll(), { passive: false } )
      threeElem.addEventListener( 'mousedown', () => this.setState({click: true}), { passive: false } )
      threeElem.addEventListener( 'mouseup', () => this.setState({click: false}), { passive: false } )
    }
}

  onScroll = () => {
    this.setState({scroll: true})

    if (this.scrollAttenuationTimeout)
      clearTimeout(this.scrollAttenuationTimeout)

    this.scrollAttenuationTimeout = setTimeout(() => {
      this.setState({scroll: false})
      this.scrollAttenuationTimeout = undefined
    }, 100)
  }

  renderTouch = () => ""

  renderDesktop = () => (
    <div className="controls-help__desktop">
      {[
        {
          flags: ["click"],
          antiFlags: ["shift"],
          text: "Look Around",
        },
        {
          flags: ["shift", "click"],
          text: "Move",
        },
        {
          flags: ["scroll"],
          text: "Zoom",
        },
      ].map(control => {
        const active =
          control.flags.map(flag => this.state[flag]).reduce((a, b) => a && b)
          &&
          !(control.antiFlags && control.antiFlags.map(flag => this.state[flag]).reduce((a, b) => a || b))

        return (
          <div
            key={control.text}
            className="controls-help__item"
          >
            <div className={
              "controls-help__item__transparent-area " +
              (active && "controls-help__item__transparent-area--active")
            }>
              <span className="controls-help__item__text">{control.text}:</span>
              {control.flags.map(flag =>
                <div
                  key={control.text + flag}
                  className={
                    "controls-help__item__button " +
                    (flag === "scroll" && "controls-help__item__button--slow-transition ") +
                    (this.state[flag] && " controls-help__item__button--active ")
                }>
                  {flag}
                </div>
              ).reduce((a, b) => <Fragment>{a}+{b}</Fragment>)}
            </div>
          </div>
      )})}
    </div>
  )

  render = () => (
    <div className="controls-help">
      {isTouchDevice() ?
      this.renderTouch()
      :
      this.renderDesktop()}
    </div>
  )
}