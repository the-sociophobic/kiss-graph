import React, { Component } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      W: 0,
      H: 0,
    }
  }

  updateDimensions = () => this.setState({
    W: window.innerWidth,
    H: window.innerHeight,
  })

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  static contextType = StoreContext

  render = () => {
    const props = {
      W: this.state.W,
      H: this.state.H,
      data: this.context,
    }
    return (
      <div className="page-container">
        <div className="viever-container" >
          <ThreeScene
            myScene={myScene}
            {...props}
          />
        </div>
        <div className="interface-container">
          <div className="interface">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}