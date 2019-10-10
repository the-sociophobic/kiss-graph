import React, { Component } from 'react'

import { clamp } from 'libs/utils/math'


export default class MobileExpander extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maxHeight: 0,
      state: "closed",
      prevousState: "closed",
      initialY: undefined,
      currentY: undefined,
      prevousY: undefined,
    }
    this.draggableArrowRef = new React.createRef()
  }

  componentDidMount() {
    const element = this.draggableArrowRef.current

    element.addEventListener( 'touchstart', this.onTouchStart.bind(this), { passive: false } )
    element.addEventListener( 'touchend', this.onTouchEnd.bind(this), { passive: false } )
    window.addEventListener( 'touchmove', this.onTouchMove.bind(this), { passive: false } )

    element.addEventListener( 'mousedown', this.onTouchStart.bind(this), { passive: false } )
    element.addEventListener( 'mouseup', this.onTouchEnd.bind(this), { passive: false } )
    window.addEventListener( 'mousemove', this.onTouchMove.bind(this), { passive: false } )

    window.addEventListener('resize', this.updateMaxHeight.bind(this))
    window.addEventListener('orientationchange', this.updateMaxHeight.bind(this))
    this.updateMaxHeight()
    
    const { prevLocation } = this.props
    if (prevLocation === "/feed")
      this.setState({state: "opened"})
  }
  componentWillUnmount() {
    const element = this.draggableArrowRef.current

    element.removeEventListener( 'touchstart', this.onTouchStart.bind(this), { passive: false } )
    window.removeEventListener( 'touchend', this.onTouchEnd.bind(this), { passive: false } )
    window.removeEventListener( 'touchmove', this.onTouchMove.bind(this), { passive: false } )

    element.addEventListener( 'mousedown', this.onTouchStart.bind(this), { passive: false } )
    window.addEventListener( 'mouseup', this.onTouchEnd.bind(this), { passive: false } )
    window.addEventListener( 'mousemove', this.onTouchMove.bind(this), { passive: false } )

    window.removeEventListener('resize', this.updateMaxHeight.bind(this))
    window.removeEventListener('orientationchange', this.updateMaxHeight.bind(this))
  }

  updateMaxHeight = () => this.setState({maxHeight: Math.floor((window.innerHeight - 80) * .7)})

  onTouchStart = event => {
    event.preventDefault()
    if (event.touches && event.touches.length !== 1)
      return
    
    this.setState({
      state: "moving",
      prevousState: this.state.state,
      initialY: event.touches ? event.touches[0].screenY : event.clientY,
      currentY: event.touches ? event.touches[0].screenY : event.clientY,
      prevousY: event.touches ? event.touches[0].screenY : event.clientY,
    })
  }
  onTouchEnd = event => {
    if (this.state.state !== "moving")
      return

    event.preventDefault()

    const deltaY = this.calculateDeltaY()
    const speed = this.state.currentY - this.state.prevousY
    let state = deltaY > (this.state.maxHeight / 2) ? "opened" : "closed"
    if (Math.abs(speed) > 12.5)
      state = speed > 0 ? "opened" : "closed"

    this.setState({
      state: state,
      prevousState: this.state.state,
      initialY: 0,
      currentY: 0,
      prevousY: 0,
    })
  }
  onTouchMove = event => {
    if (this.state.state !== "moving")
      return

    event.preventDefault()
    event.stopPropagation()

    this.setState({
      prevousState: this.state.state === "moving" ? this.state.prevousState : this.state.state,
      prevousY: this.state.currentY,
      currentY: event.touches ? event.touches[0].screenY : event.clientY,
    })
  }

  calculateDeltaY = () => {
    let delta

    if (this.state.prevousState === "closed")
      delta = clamp(this.state.currentY - this.state.initialY, 0, this.state.maxHeight)
    else
      delta = clamp(this.state.maxHeight + this.state.currentY - this.state.initialY, 0, this.state.maxHeight)

    return delta
  }

  render = () => {
    const deltaY = this.calculateDeltaY()
    let heightStyle = {}
    // console.log(deltaY)
    if (this.state.state === "moving")
      heightStyle = {height: deltaY + "px"}
    if (this.state.state === "opened")
      heightStyle = {height: this.state.maxHeight + "px"}
    
    return (
      <div className="mobile-expander">
        <div className="mobile-expander__abs-container">
          <div
            className={"mobile-expander__expanding-content-container " + this.state.state}
            style={heightStyle}
          >
            <div
              className={"mobile-expander__static-content-container"}
              style={{height: this.state.maxHeight + "px"}}
            >
              {this.props.children}
            </div>
          </div>
          <div
            className={"mobile-expander__draggable-arrow " + this.state.state}
            ref={this.draggableArrowRef}
          />
        </div>
      </div>
    )
  }
}