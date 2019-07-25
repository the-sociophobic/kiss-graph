import React, { Component } from 'react'

import THREE from 'libs/engines/3d/three'

import LevControls from 'libs/engines/3d/units/LevControls'

export default class ThreeScene extends Component{
  constructor(props) {
    super(props)
    this.viewerRef = new React.createRef()
  }

  updateDimensions() {
    const ViewerDiv = this.viewerRef && this.viewerRef.current
    if (!this.renderer || !ViewerDiv || !this.camera)
      return
    this.camera.aspect = ViewerDiv.clientWidth / ViewerDiv.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(ViewerDiv.clientWidth, ViewerDiv.clientHeight)
    this.controls.update()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))

    const ViewerDiv = this.viewerRef.current
    const width = ViewerDiv.clientWidth
    const height = ViewerDiv.clientHeight

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor('#f6f6f6')
    // this.renderer.setClearColor('#555555')
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(2)
    ViewerDiv.appendChild(this.renderer.domElement)    

    //ADD SCENE
    this.scene = new THREE.Scene()

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.controls = new LevControls( this.camera, this.render.domElement )
    this.controls.panSpeed = 1.5
    this.camera.position.z = 5
    this.controls.update()

    this.units = []
    const props = {
      THREE: THREE,
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      ...this.props.data, //TODO adequately
      sendData: this.props.sendData,
    }

    this.props.myScene.units.forEach(unit => this.units.push(new unit(props)))
    this.start()

  }

  componentWillUnmount(){
    this.units.forEach(unit => unit.dispose())
    this.stop()
    // this.viewerRef.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId)
      this.frameId = requestAnimationFrame(this.animate)
  }
  stop = () => cancelAnimationFrame(this.frameId)

  animate = () => {
    this.units.forEach(unit => unit.animate())
    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate)
    this.controls.update()
  }
  
  render = () => (
    <div
      className="Viewer"
      ref={this.viewerRef}
    />
  )
}
