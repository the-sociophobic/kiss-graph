import React, { Component } from 'react';
import THREE from 'libs/engine/three';

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
  }

  componentDidMount(){
    window.addEventListener('resize', this.updateDimensions.bind(this))

    const ViewerDiv = this.viewerRef.current
    const width = ViewerDiv.clientWidth
    const height = ViewerDiv.clientHeight

    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4

    this.controls = new THREE.OrbitControls( this.camera, ViewerDiv )


    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor('#f6f6f6')
    this.renderer.setSize(width, height)

    ViewerDiv.appendChild(this.renderer.domElement)

    this.units = []
    const props = {
      THREE: THREE,
      renderer: this.renderer,
      scene: this.scene,
    }
    this.props.myScene.units.forEach(unit => this.units.push(new unit(props)))
    this.start()
  }
  componentWillUnmount(){
    this.units.forEach(unit => unit.antiInit())
    this.stop()
    this.viewerRef.removeChild(this.renderer.domElement)
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
  }
  
  render = () => (
    <div
      ref={this.viewerRef}
      className="Viewer"
    />
  )
}
