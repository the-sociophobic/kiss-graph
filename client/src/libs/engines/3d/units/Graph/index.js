import TextSprite from 'three.textsprite'
import UserSprite from 'libs/engines/3d/units/UserSprite'

import Unit from 'libs/engines/3d/Unit'
import LineGraph from './LineGraph'
import HeatGraph from './HeatGraph'


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

    scene.add( HeatGraph(this.nodes, this.edges, scene) )
    // scene.add( LineGraph(this.nodes, this.edges, scene) )
      
    nodes.forEach((node, index) => {
      // let sprite = new TextSprite({
      let sprite = new UserSprite({
        material: {
          color: 0x000000,
          fog: false,
        },
        redrawInterval: 1000,
        textSize: .25,
        minFontSize: 32,
        maxFontSize: 64,
        texture: {
          fontFamily: 'Arial, Helvetica, sans-serif',
          text: node.name.replace(' ', '\n'),
        },  
      })

      sprite.position.set(node.pos.x, node.pos.y, node.pos.z)
      scene.add(sprite)
      sprite.cursor = 'pointer'
      sprite.on('click', () => props.setNode(node.id))
      
      var timer, touchStarted = false
      const registerTapHandler = () => {
        timer = setTimeout(() => unregisterTapHandler(), 400)
        touchStarted = true
      }
      const unregisterTapHandler = () => {
        touchStarted = false
        clearTimeout(timer)
      }
      const tapHandler = () => {
        if (touchStarted)
          props.setNode(node.id)
        unregisterTapHandler()
      }
      sprite.on('touchstart', registerTapHandler)
      sprite.on('touchend', tapHandler)
    })
  }
  animate() {}
  dispose() {}
}