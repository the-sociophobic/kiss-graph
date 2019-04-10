import React, { Component } from 'react'
import Viever from 'components/Viewer'
import './index.sass'

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
          <Viever
            blurredCanvasRef={this.blurredCanvasRef}
          />
        </div>
        <div className="interface-container">
          <div className="backdrop-blur">
            <canvas
              width={this.state.W + 80}
              height={this.state.H + 80}
              className="blured-canvas" ref={this.blurredCanvasRef}
            />
          </div>
          <div className="interface">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}