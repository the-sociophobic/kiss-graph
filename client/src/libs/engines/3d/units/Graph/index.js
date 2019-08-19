import TextSprite from 'three.textsprite'
import UserSprite from 'libs/engines/3d/units/UserSprite'

import Unit from 'libs/engines/3d/Unit'
import LineGraph from './LineGraph'
import HeatGraph from './HeatGraph'

import tapEvent from 'libs/utils/tapEvent'

import myImage from 'img/defaultPhoto.png'

export default class Graph extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props
    const { nodes, edges } = this.props.store.get()

    this.edges = edges.map(edge => ({
      node0: nodes.map(node => node.name).indexOf(edge.node0),
      node1: nodes.map(node => node.name).indexOf(edge.node1),
    }))

    this.nodes = nodes
    .map(node => {
      return ({
        vector: new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z),
        weight: node.connections,
      })
    })

    // scene.add( HeatGraph(this.nodes, this.edges, scene) ) //IT SHOULD WORK LIKE THAT
    HeatGraph(this.nodes, this.edges, scene)
    // scene.add( LineGraph(this.nodes, this.edges, scene) )
      
    nodes.forEach((node, index) => {
      // let sprite = new TextSprite({
      let sprite
      if (!node.avatar) {
        sprite = new UserSprite({
          material: {
            color: 0x000000,
            fog: false,
          },
          redrawInterval: 500,
          textSize: .25,
          // minFontSize: 32,
          minFontSize: 16,
          // maxFontSize: 64,
          maxFontSize: 32,
          texture: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            text: node.name.replace(' ', '\n'),
          },  
        })

        sprite.position.set(node.pos.x, node.pos.y, node.pos.z + .5)
        scene.add(sprite)
        sprite.cursor = 'pointer'      
        tapEvent(sprite, () => props.setNode(node.id))
        tapEvent(sprite, () => props.setNode(node.id), 'mousedown', 'mouseup')
  
      } else {
        new THREE.TextureLoader().load( node.avatar, spriteMap => {
          spriteMap.minFilter = THREE.LinearFilter //disable when power of 2 textures
          var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
          sprite = new THREE.Sprite( spriteMaterial );
          let aspect = Math.max(spriteMap.image.height / spriteMap.image.width, 1)
          let k = Math.log(aspect, 3) ** .1
          sprite.scale.set(k, aspect * k, k)

          sprite.position.set(node.pos.x, node.pos.y, node.pos.z + .03)
          scene.add(sprite)
          sprite.cursor = 'pointer'      
          tapEvent(sprite, () => props.setNode(node.id))
          tapEvent(sprite, () => props.setNode(node.id), 'mousedown', 'mouseup')
        } );
      }

      
    })
  }
  animate() {}
  dispose() {}
}