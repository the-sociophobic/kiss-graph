import React, { Component } from 'react'
import Viever from 'components/Viewer'

import ThreeScene from './ThreeScene'
import Cube from 'libs/units/Cube'

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      W: 0,
      H: 0,
    }
    this.canvasRef = React.createRef()
    this.blurredCanvasRef = React.createRef()
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

  render = () => {
    return (
      <div className="page-container">
        <div className="viever-container" >
          {/* <Viever /> */}
          <ThreeScene>
            <Cube />
          </ThreeScene>
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