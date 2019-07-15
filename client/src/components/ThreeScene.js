import React, { Component } from 'react'
import Hammer from 'hammerjs'

import THREE from 'libs/engines/3d/three'

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
    this.renderer.setSize(width, height)
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
    this.controls = new THREE.OrbitControls( this.camera, this.render.domElement )
    this.controls.screenSpacePanning = true
    this.controls.enableZoom = false //disable zoom on mousewheel
    this.controls.panSpeed = 2
    window.addEventListener("wheel", this.cameraCustomZoom.bind(this), {passive: false})
    this.camera.position.z = 5
    this.controls.update()
    //prevent window from reactiong to controls 
    const preventDefault = event => event.preventDefault()
    //Web
    ViewerDiv.addEventListener("onscroll", preventDefault, {passive: false})    
    ViewerDiv.addEventListener("wheel", preventDefault, {passive: false})    
    //Mobile
    ViewerDiv.addEventListener("touchstart", preventDefault, {passive: false})
    ViewerDiv.addEventListener("touchend", preventDefault, {passive: false})
    ViewerDiv.addEventListener("touchcancel", preventDefault, {passive: false})
    ViewerDiv.addEventListener("touchmove", preventDefault, {passive: false})    


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

    this.hammer = new Hammer(this.viewerRef.current)
    this.hammer.get('pinch').set({ enable: true })
    this.hammer.on('pinch', this.cameraCustomZoom.bind(this))

  }

  cameraCustomZoomm = e => {
    console.log("e")
  }

  componentWillUnmount(){
    this.units.forEach(unit => unit.antiInit())
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

  cameraCustomZoom = e => {
    const delta = typeof e.deltaY !== "undefined" ? e.deltaY * .125 : (e.scale - 1)
    var vector = new THREE.Vector3(0, 0, -1)
    .applyQuaternion(this.camera.quaternion)
    .multiplyScalar(delta)
    this.camera.position.add(vector)
    this.controls.target.add(vector)
    this.controls.update()
  }
  
  render = () => (
    // <div ref={this.viewerRef} className="Viewer">
    //   <Hammer
    //     onPinch={this.cameraCustomZoom}
    //     options={{
    //       recognizers: {
    //         pinch: { enable: true }
    //       }}}
    //   >
        <div
          className="Viewer"
          ref={this.viewerRef}
        />
    //   </Hammer>
    // </div>
  )
}
