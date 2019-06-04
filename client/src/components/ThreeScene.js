import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
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
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor('#f6f6f6')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    // this.props.children.forEach(child => child.init())
    this.start()
  }
  componentWillUnmount(){
    if (this.props.children)
      React.Children.forEach(child => child.antiInit())
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId)
      this.frameId = requestAnimationFrame(this.animate)
  }
  stop = () => cancelAnimationFrame(this.frameId)

  animate = () => {
    if (this.props.children)
      React.Children.forEach(child => child.animate())

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default ThreeScene