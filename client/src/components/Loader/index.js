import React, { Component } from 'react'

// import Emoji from 'components/Emoji'
import StoreContext from 'libs/engines/data/store/StoreContext'

import kiss from './kiss.png'


const transition = 200


class Loader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true,
      transparent: false,
    }

    this.checkInterval = setInterval(() => {
      if (this.context?.threeSceneRef?.current?.units?.heatGraph) {
        clearInterval(this.checkInterval)
        this.init()
      }
    }, 50)
  }

  init = () =>
    this.context.threeSceneRef.current.units.heatGraph.addInitListener(() => this.hide())

  show = () => {
    this.setState({
      display: true,
      transparent: true
    })
    setTimeout(() => this.setState({transparent: false}), 10)
  }

  hide = () => {
    // this.setState({display: false})
    this.setState({transparent: true})
    setTimeout(() => this.setState({display: false}), transition)
  }

  render = () => (
    <div
      className="loader"
      style={{
        transition: `opacity ${transition}ms`,
        display: this.state.display ? "flex" : "none",
        opacity: this.state.transparent ? 0 : 1,
      }}
    >
      <div className="loader__container">
        <div className="loader__emoji__container">
          <img className="emoji" src={kiss} alt="kiss" />
        </div>
        <div className="loader__text">
          {this.props.children}
        </div>
        <div className="loader__by">
          by <b className="gradient-text gradient-text-animation-1">@the_sociophobic</b>
        </div>
      </div>
    </div>
  )
}

Loader.contextType = StoreContext

export default Loader