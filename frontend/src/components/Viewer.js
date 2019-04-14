import React, { Component } from 'react'
import THREE from 'libs/three'

export default class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderer: undefined,
    }
    this.viewerRef = new React.createRef()
  }

  updateDimensions() {
    const ViewerDiv = this.viewerRef && this.viewerRef.current
    if (!this.renderer || !ViewerDiv || !this.camera)
      return
    this.camera.aspect = ViewerDiv.offsetWidth / ViewerDiv.offsetHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(ViewerDiv.offsetWidth, ViewerDiv.offsetHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))

    var ViewerDiv = this.viewerRef.current

    this.scene = new THREE.Scene();
    const scene = this.scene
    scene.background = new THREE.Color( 0x0affff );

    // this.camera = new THREE.OrthographicCamera(ViewerDiv.offsetWidth / -2, ViewerDiv.offsetWidth / 2, ViewerDiv.offsetHeight / -2, ViewerDiv.offsetHeight / 2, 1, 500);
    this.camera = new THREE.PerspectiveCamera( 45, ViewerDiv.offsetWidth / ViewerDiv.offsetHeight, 1, 5000 )
    const camera = this.camera

    this.controls = new THREE.OrbitControls( camera, ViewerDiv );
    const controls = this.controls

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    const renderer = this.renderer

    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(ViewerDiv.offsetWidth, ViewerDiv.offsetHeight );
    ViewerDiv.appendChild(renderer.domElement);
    
    const cubeSize = ViewerDiv.offsetWidth > 512 ? 250 : (100 + ViewerDiv.offsetWidth / 512 * 100);
    var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
    var material = new THREE.MeshStandardMaterial( {
      roughness: 0.7,
      color: 0x010005,
      metalness: 0.2,
      bumpScale: 0.002
    } );
    this.cube = new THREE.Mesh( geometry, material );
    const cube = this.cube
    cube.receiveShadow = true;
    scene.add( cube );

    var Light0 = new THREE.PointLight(0xffffff, 5, 2500);
    Light0.position.set(110, -210, -620);
    scene.add( Light0 );
    var Light1 = new THREE.PointLight(0xffffff, 2, 2500);
    Light1.position.set(-110, 210, -620);
    scene.add( Light1 );

    camera.position.set( 0, 0, 700 );
    camera.lookAt( 0, 0, 0 );
    cube.rotation.x += .3;
    cube.position.z -= 500;

    controls.update();

    this.animate.bind(this)()
  }

  animate() {
    const {renderer, scene, camera, cube, controls} = this
    requestAnimationFrame( this.animate.bind(this) );
    renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    cube.position.z += 0.1;
    
    const blurredCanvas = this.props.blurredCanvasRef.current
    if (blurredCanvas && renderer.domElement &&
        blurredCanvas.offsetWidth > 0 && 
        blurredCanvas.offsetHeight > 0 && 
        renderer.domElement.offsetWidth > 0 && 
        renderer.domElement.offsetHeight > 0)
      blurredCanvas.getContext('2d').drawImage(renderer.domElement, 0, 0)
      
    controls.update();
  }

  render = () => <div className="Viewer" ref={this.viewerRef} />
}