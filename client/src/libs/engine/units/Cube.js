import Unit from 'libs/engine/Unit'

export default class Cube extends Unit {
  constructor(props) {
    super(props)
    const { THREE, renderer, scene } = props
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    scene.add(this.cube)
  }
  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
  }
  antiInit() {}
}