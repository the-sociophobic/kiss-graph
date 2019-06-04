import THREE from 'libs/three'
import Unit from 'libs/Unit'

export default class Cube extends Unit {
  init() {
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.renderer.scene.add(this.cube)
  }
  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    console.log("cuuube")
  }
  antiInit() {}
}