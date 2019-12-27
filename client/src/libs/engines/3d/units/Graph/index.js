// import TextSprite from 'three.textsprite'
import UserSprite from 'libs/engines/3d/units/UserSprite'

import Unit from 'libs/engines/3d/Unit'
// import LineGraph from './LineGraph'
import HeatGraph from './HeatGraph'

import tapEvent from 'libs/utils/tapEvent'
import { currentTheme, addThemeEventListener } from 'libs/utils/colorTheme'

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

    HeatGraph(this.nodes, this.edges, scene)

    this.currentTheme = currentTheme()
    this.theme = {}
    this.addTheme(this.currentTheme)
  }

  addTheme = color => {
    const { THREE, scene } = this.props
    const { nodes } = this.props.store.get()
    var themeGroup = new THREE.Group()
    var fontColor = color === "light" ? 0x000000 : 0xfffffff

    nodes.forEach(node =>
      themeGroup.add(this.createNodeSprite(node, fontColor, this.props)))
    scene.add(themeGroup)
    this.theme[color] = themeGroup
    // addThemeEventListener(this.updateTheme)
  }

  createNodeSprite = (node, color, props) => {
    let sprite
    // if (!node.avatar) {
      sprite = new UserSprite({
        material: {
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
    // } else {
    //   new THREE.TextureLoader().load( node.avatar, spriteMap => {
    //     spriteMap.minFilter = THREE.LinearFilter //disable when power of 2 textures
    //     var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    //     sprite = new THREE.Sprite( spriteMaterial );
    //     let aspect = Math.max(spriteMap.image.height / spriteMap.image.width, 1)
    //     let k = Math.log(aspect, 3) ** .1
    //     sprite.scale.set(k, aspect * k, k)

    //     sprite.position.set(node.pos.x, node.pos.y, node.pos.z + .03)
    //     scene.add(sprite)
    //     sprite.cursor = 'pointer'      
    //     tapEvent(sprite, () => props.setNode(node.id))
    //     tapEvent(sprite, () => props.setNode(node.id), 'mousedown', 'mouseup')
    //   } )
    // }
  }


  updateTheme = () => {
    const theme = currentTheme()

    if (this.currentTheme !== theme) {
      if (theme === "light") {
        if (typeof this.theme["light"] === "undefined")
          this.addTheme("light")
        this.theme["light"].visible = true
        this.theme["dark"].visible = false
      } else {
        if (typeof this.theme["dark"] === "undefined")
          this.addTheme("dark")
        this.theme["light"].visible = false
        this.theme["dark"].visible = true
      }
      this.currentTheme = theme
    }
  }

  animate = () => {
    this.updateTheme()
  }
  dispose() {}
}