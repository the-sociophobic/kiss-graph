import React, { Component } from 'react'

import THREE from 'libs/engines/3d/three'

import LevControls from 'libs/engines/3d/units/LevControls'

import { Interaction } from 'three.interaction'

import ResizeObserver from 'resize-observer-polyfill'

const targetToCamera = 5

// var rot = 0


export default class ThreeScene extends Component{
  constructor(props) {
    super(props)
    this.viewerRef = new React.createRef()
    this.transitions = []
    

    //camera idle vars NEEDS OPTIMISATION
    this.lastIdle = new Date().getTime()
    this.prevCameraPos = new THREE.Vector3()
    this.prevCameraTarget = new THREE.Vector3()
    this.idleRotation = 0
  }

  updateDimensions() {
    const ViewerDiv = this.viewerRef && this.viewerRef.current
    if (!this.renderer || !ViewerDiv || !this.camera)
      return
    this.camera.aspect = ViewerDiv.clientWidth / ViewerDiv.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(ViewerDiv.clientWidth, ViewerDiv.clientHeight)
    this.controls.update()

    if (ViewerDiv.clientWidth < 500 || ViewerDiv.clientHeight < 500)
      this.renderer.setPixelRatio(2)
    else
      this.renderer.setPixelRatio(1)
  }

  componentDidMount() {
    this.resizeObs = new ResizeObserver(this.updateDimensions.bind(this))
      .observe(this.viewerRef.current)

    const ViewerDiv = this.viewerRef.current
    const width = ViewerDiv.clientWidth
    const height = ViewerDiv.clientHeight

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // this.renderer.setClearColor('#f6f6f6')
    this.renderer.setClearColor('#fafafa')
    this.renderer.setSize(width, height)
    if (width < 500 || height < 500)
      this.renderer.setPixelRatio(2)
    // this.renderer.sortObjects = false
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
    this.controls = new LevControls( this.camera, ViewerDiv )
    this.controls.panSpeed = 1.5
    this.controls.enableKeys = false
    this.camera.position.z = targetToCamera
    this.controls.update()

    if (this.props.nodeToShow && this.props.setNode) {
      this.props.setNode(this.props.nodeToShow.id, false)
      //setCamera() doesn't fire in setNode...
      this.setCamera(
        this.props.nodeToShow.cameraPosition,
        this.props.nodeToShow.cameraTarget,
        false
      )
    }

    this.interaction = new Interaction(this.renderer, this.scene, this.camera)

    this.units = []
    const props = {
      THREE: THREE,
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      interaction: this.interaction,
      ...this.props.data, //TODO adequately
      sendData: this.props.sendData,
      setNode: this.props.setNode,
    }

    this.props.myScene.units.forEach(unit => this.units.push(new unit(props)))

    if (!this.frameId)
      this.frameId = requestAnimationFrame(this.animate)
  }

  componentWillUnmount(){
    this.units.forEach(unit => unit.dispose())
    cancelAnimationFrame(this.frameId)
    // this.viewerRef.removeChild(this.renderer.domElement)
  }

  animate = () => {
    this.units.forEach(unit => unit.animate())


    //VECTOR TRANSITIONS
    let unregisteredTransitions = []
    this.transitions.forEach((transition, index) => {
      if (transition.currentFrame === transition.numberOfFrames)
        unregisteredTransitions.push(index)
      else {
        const alpha = 1 / (transition.numberOfFrames - transition.currentFrame)
        transition.variable.lerp(transition.value, alpha)
        transition.currentFrame++
      }
    })
    unregisteredTransitions.forEach(transitionIndex =>
      this.transitions = [
        ...this.transitions.slice(0, transitionIndex),
        ...this.transitions.slice(transitionIndex + 1)
      ]
    )


    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate)

    
    // rot += .024
    // console.log(rot)
    // if (rot >= 3.1415 * 2) {
    //   rot = 0
    //   this.props.setNode(Math.round(Math.random() * 1000))
    // }
    // // this.camera.position.set(camVec.x + 5 * Math.cos(rot), camVec.y + 5 * Math.sin(rot), camVec.z)
    // this.camera.position.set(this.controls.target.x + 5 * Math.cos(rot), this.controls.target.y, this.controls.target.z + 5 * Math.sin(rot))
    // const idleTime = 5
    // if (this.prevCameraPos.clone().sub(this.camera.position).lengthSq > .001 &&
    //     this.prevCameraTarget.clone().sub(this.controls.target).lengthSq > .001) {
    //   this.lastIdle = new Date().getTime()
    // } 

    this.controls.update()
  }

  setCamera = (position, target, transition = true) => {
    // this.camera.position.fromArray(position)
    // this.controls.target.fromArray(target)
    // const newPosition = new THREE.Vector3(...position)
    // console.log(target)
    if (typeof target === "undefined" || this.transitions.length > 0)
      return
    const newTarget = new THREE.Vector3(...target)
    const newPosition = newTarget.clone()
      .add(this.camera.position.clone()
        .sub(this.controls.target)
        .normalize()
        .multiplyScalar(targetToCamera)
      )

    if (transition) {
      let numberOfFrames = new THREE.Vector3()
        .subVectors(newPosition, this.camera.position)
        .lengthSq() ** .25 * 3
      numberOfFrames = Math.ceil(numberOfFrames)
 
      this.registerTransition(this.camera.position, newPosition, numberOfFrames)
      this.registerTransition(this.controls.target, newTarget, numberOfFrames)
    }
    else {
      this.camera.position.copy(newPosition)
      this.controls.target.copy(newTarget)
    }

    this.controls.update()
  }

  registerTransition = (variable, value, numberOfFrames) => {
    this.transitions.push({
      variable: variable,
      value: value,
      numberOfFrames: numberOfFrames || 10,
      currentFrame: 0,
    })
  }
  
  render = () => (
    <div
      className="Viewer"
      ref={this.viewerRef}
    />
  )
}
