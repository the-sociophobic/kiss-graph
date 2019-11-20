// import TextSprite from 'three.textsprite'
import UserSprite from 'libs/engines/3d/units/UserSprite'

import Unit from 'libs/engines/3d/Unit'
// import LineGraph from './LineGraph'
import HeatGraph from './HeatGraph'

import tapEvent from 'libs/utils/tapEvent'

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
        uv: node.uv,
      })
    })

    // scene.add( HeatGraph(this.nodes, this.edges, scene) ) //IT SHOULD WORK LIKE THAT
    HeatGraph(this.nodes, this.edges, scene)
    // scene.add( LineGraph(this.nodes, this.edges, scene) )
      
    const createNodeSprite = (node, color) => {
      let sprite
      if (!node.avatar) {
        sprite = new UserSprite({
          material: {
            // color: 0x000000,
            color: color,
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

        // sprite.position.set(node.pos.x, node.pos.y, node.pos.z + .5)
        sprite.position.set(node.pos.x, node.pos.y, node.pos.z)
        // scene.add(sprite)
        sprite.cursor = 'pointer'      
        tapEvent(sprite, () => props.setNode(node.id))
        tapEvent(sprite, () => props.setNode(node.id), 'mousedown', 'mouseup')

        return sprite
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
        } )
      }
    }

    var nodesLightTheme = new THREE.Group()
    var nodesDarkTheme = new THREE.Group()
    nodes.forEach(node => {
      let lightNode = createNodeSprite(node, 0x000000)
      let darkNode = createNodeSprite(node, 0xffffff)

      nodesLightTheme.add(lightNode)
      nodesDarkTheme.add(darkNode)
    })
    scene.add(nodesLightTheme)
    scene.add(nodesDarkTheme)
    
    this.nodesLightTheme = nodesLightTheme
    this.nodesDarkTheme = nodesDarkTheme
  }

  updateTheme = () => {
    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

    if (this.theme !== theme) {
      if (theme === "light") {
        this.nodesLightTheme.visible = true
        this.nodesDarkTheme.visible = false
      } else {
        this.nodesLightTheme.visible = false
        this.nodesDarkTheme.visible = true
      }
      this.theme = theme
    }
  }

  animate = () => this.updateTheme()
  dispose() {}
}