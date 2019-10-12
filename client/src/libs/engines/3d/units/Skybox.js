import Unit from 'libs/engines/3d/Unit'

import top from 'img/skybox/top.png'
import side from 'img/skybox/side.png'
import bottom from 'img/skybox/bottom.png'

export default class Skybox extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props

    scene.background = new THREE.CubeTextureLoader()
      .load( [ side, side, top, bottom, side, side ] );
  }
  animate() {}
  dispose() {}
}
