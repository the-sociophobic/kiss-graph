import React, { Component } from 'react'

// import { Interaction } from 'three.interaction'
import { Interaction } from 'libs/engines/3d/three.interaction/src/index.js'
import ResizeObserver from 'resize-observer-polyfill'

import THREE from 'libs/engines/3d/three'
import LevControls from 'libs/engines/3d/units/LevControls'
import StoreContext from 'libs/engines/data/store/StoreContext'
import isProduction from 'libs/utils/isProduction'


const targetToCamera = 5

class ThreeScene extends Component {
  constructor(props) {
    super(props)
    this.viewerRef = new React.createRef()
    this.transitions = []

    this.units = {}

    this.idle = {
      active: false,
      cameraAngleXZ: 0,
      cameraOffsetXZ: targetToCamera,
      cameraOffsetY: 0,
      cameraRotationSpeed: 0,
    }
  }

  updateDimensions() {
    const ViewerDiv = this.viewerRef && this.viewerRef.current
    if (!this.renderer || !ViewerDiv || !this.camera)
      return
    this.camera.aspect = ViewerDiv.clientWidth / ViewerDiv.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(ViewerDiv.clientWidth, ViewerDiv.clientHeight)
    this.controls.update()

    // if (ViewerDiv.clientWidth < 500 || ViewerDiv.clientHeight < 500)
    //   this.renderer.setPixelRatio(1)
    // else
    //   this.renderer.setPixelRatio(1)
  }

  componentDidMount() {
    //REGISTER Camera Idle
    if (isProduction()) {
      this.toggleIdle()
      window.addEventListener( 'click', this.toggleIdle, { passive: true } )
      window.addEventListener( 'touchstart', this.toggleIdle, { passive: true } )
      window.addEventListener( 'mouseup', this.toggleIdle, { passive: true } )
      window.addEventListener( 'contextmenu', this.toggleIdle, { passive: true } )
      window.addEventListener( 'mousedown', this.toggleIdle, { passive: true } )
      window.addEventListener( 'wheel', this.toggleIdle, { passive: true } )
      window.addEventListener( 'touchstart', this.toggleIdle, { passive: true } )
      window.addEventListener( 'touchend', this.toggleIdle, { passive: true } )
      window.addEventListener( 'touchmove', this.toggleIdle, { passive: true } )
      window.addEventListener( 'keydown', this.toggleIdle, { passive: true } )
    }

    this.resizeObs = new ResizeObserver(this.updateDimensions.bind(this))
      .observe(this.viewerRef.current)

    const ViewerDiv = this.viewerRef.current
    const width = ViewerDiv.clientWidth
    const height = ViewerDiv.clientHeight

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // this.renderer.setClearColor('#f6f6f6')
    // this.renderer.setClearColor('#fafafa')
    // this.renderer.setClearColor('#000')
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setSize(width, height)
    // if (width < 500 || height < 500)
    this.renderer.setPixelRatio(isProduction() ? 2 : 1)
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
        this.props.nodeToShow.pos,
        false
      )
    }

    this.interaction = new Interaction(this.renderer, this.scene, this.camera)

    this.initUnits()
    this.context.store.addUpdateListener(() => {
      this.disposeUnits()
      this.initUnits()
    })

    if (!this.frameId)
      this.frameId = requestAnimationFrame(this.animate)
  }

  componentWillUnmount(){
    this.disposeUnits()
    cancelAnimationFrame(this.frameId)
    // this.viewerRef.removeChild(this.renderer.domElement)
  }

  initUnits = () => {
    this.units = {}
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

    Object.keys(this.props.myScene.units)
      .forEach(unitName => {
        const unit = this.props.myScene.units[unitName]

        if (!unit.disabled ^ this.unitsToggled)
          this.units[unitName] = new unit.unit(props)
      })
        
  }

  disposeUnits = () => {
    Object.keys(this.units)
      .forEach(unitName => this.units[unitName].dispose())
    //REDO THIS SHIT: units should unregister themselves
    while(this.scene.children.length > 0)
      this.scene.remove(this.scene.children[0])
  }

  toggleUnits = () => {
    this.disposeUnits()
    this.unitsToggled = !this.unitsToggled
    this.initUnits()
  }

  animate = () => {
    Object.keys(this.units).forEach(unitName => this.units[unitName].animate())

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

    this.idleAnimation()

    this.controls.update()
  }

  setCamera = (target, transition = true) => {
    // this.camera.position.fromArray(position)
    // this.controls.target.fromArray(target)
    // const newPosition = new THREE.Vector3(...position)
    // console.log(target)
    if (typeof target === "undefined" || this.transitions.length > 0)
      return
    const newTarget = new THREE.Vector3(target.x, target.y, target.z)
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

  idleAnimation = () => {
    if (this.idle.active) {
      if (this.idle.cameraRotationSpeed < .025)
        this.idle.cameraRotationSpeed += .00017

      this.idle.cameraAngleXZ += this.idle.cameraRotationSpeed
      if (this.idle.cameraAngleXZ >= Math.PI * 2) {
        this.idle.cameraAngleXZ = 0
        const randomNode = this.context.store.get().nodes[
          Math.round(Math.random() * (this.context.store.get().nodes.length - 1))
        ]
        this.props.setNode(randomNode.id, true, true)
      }
      this.camera.position.set(
        this.controls.target.x + this.idle.cameraOffsetXZ * Math.sin(this.idle.cameraAngleXZ),
        this.controls.target.y + this.idle.cameraOffsetY,
        this.controls.target.z + this.idle.cameraOffsetXZ * Math.cos(this.idle.cameraAngleXZ)
      )
    }
  }

  toggleIdle = () => {
    this.idle.active = false
    this.idle.cameraRotationSpeed = 0

    if (this.idle.Timeout)
      clearTimeout(this.idle.Timeout)

    this.idle.Timeout = setTimeout(() => {
      this.idle.cameraOffsetXZ = ((this.controls.target.x - this.camera.position.x) ** 2 + (this.controls.target.z - this.camera.position.z) ** 2) ** .5
      this.idle.cameraOffsetY = this.camera.position.y - this.controls.target.y
      let angle = Math.acos((this.camera.position.z - this.controls.target.z) / this.idle.cameraOffsetXZ)

      if (this.camera.position.x - this.controls.target.x < 0)
        angle = Math.PI * 2 - angle

      if (angle >= 0 && angle <= Math.PI * 2)
        this.idle.cameraAngleXZ = angle

      this.idle.active = true
    }, 120000)
  }
  
  render = () => (
    <div
      className="Viewer"
      ref={this.viewerRef}
    />
  )
}

ThreeScene.contextType = StoreContext

export default ThreeScene