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
    const renderer = this.state.renderer
    const camera = this.state.camera
    if (!renderer || !ViewerDiv || !camera)
      return
    // camera.aspect = ViewerDiv.offsetWidth / ViewerDiv.offsetHeight
    // camera.updateProjectionMatrix()
    // this.setState({camera: camera})
    // console.log(this.state.camera.aspect)
    renderer.setSize(ViewerDiv.offsetWidth, ViewerDiv.offsetHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))

    var ViewerDiv = this.viewerRef.current

    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    const camera = new THREE.OrthographicCamera(ViewerDiv.offsetWidth / -2, ViewerDiv.offsetWidth / 2, ViewerDiv.offsetHeight / -2, ViewerDiv.offsetHeight / 2, 1, 500);
    this.setState({camera: camera})
    var controls = new THREE.OrbitControls( camera, ViewerDiv );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    this.setState({renderer: renderer})
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(ViewerDiv.offsetWidth, ViewerDiv.offsetHeight );
    ViewerDiv.appendChild(renderer.domElement);
    
    var cubeSize = ViewerDiv.offsetWidth > 512 ? 250 : (100 + ViewerDiv.offsetWidth / 512 * 100);
    var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
    var material = new THREE.MeshStandardMaterial( {
      roughness: 0.7,
      color: 0x010005,
      metalness: 0.2,
      bumpScale: 0.002
    } );
    var cube = new THREE.Mesh( geometry, material );
    cube.receiveShadow = true;
    scene.add( cube );

    var Light0 = new THREE.PointLight(0xffffff, 5, 2500);
    Light0.position.set(110, -210, -620);
    scene.add( Light0 );
    var Light1 = new THREE.PointLight(0xffffff, 2, 2500);
    Light1.position.set(-110, 210, -620);
    scene.add( Light1 );

    camera.position.set( 0, 0, 10 );
    camera.lookAt( 0, 0, 0 );
    cube.rotation.x += .3;
    cube.position.z -= 200;

    controls.update();

    const that = this
    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, that.state.camera );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.005;
      cube.position.z += 0.1;
      const blurredCanvas = that.props.blurredCanvasRef.current
      if (blurredCanvas)
        blurredCanvas.getContext('2d').drawImage(renderer.domElement, 0, 0)
        
      controls.update();
    }
    animate();
  }

  render = () => <div className="Viewer" ref={this.viewerRef} />
}