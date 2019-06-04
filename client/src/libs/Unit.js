import React, { Component } from 'react'

export default class Unit extends Component {
  constructor(props) {
    super(props)
    this.renderer = props.renderer
  }
  componentDidMount() {
    this.init()
  }
  init() {}
  animate() {
    console.log("uniiit")
  }
  antiInit() {}

  render = () => <div />
}