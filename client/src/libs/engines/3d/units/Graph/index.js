import classes from 'multiple-extend'

import UserSprite from 'libs/engines/3d/units/UserSprite'

import Unit from 'libs/engines/3d/Unit'
import listenersClass from 'libs/utils/listenersClass'

import HeatGraph from './HeatGraph'

import tapEvent from 'libs/utils/tapEvent'
// import { currentTheme, addThemeEventListener } from 'libs/utils/colorTheme'
import { currentTheme } from 'libs/utils/colorTheme'
// import isProduction from 'libs/utils/isProduction'


export default class Graph extends classes(Unit, listenersClass) {
  constructor(props) {
    super(props)
    const { store, scene } = props

    HeatGraph(store, scene)

    this.currentTheme = currentTheme()
    this.theme = {}
    this.addTheme(this.currentTheme)
  }

  addTheme = color => {
    const { THREE, scene } = this.props
    const { nodes } = this.props.store.get()
    var themeGroup = new THREE.Group()
    var fontColor = color === "light" ? 0x000000 : 0xfffffff

    // nodes.forEach(node =>
    //   themeGroup.add(this.createNodeSprite(node, fontColor, this.props)))
    // // themeGroup.renderOrder = 1
    // scene.add(themeGroup)
    // this.theme[color] = themeGroup
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
        redrawInterval: false,
        textSize: .25,
        // minFontSize: 32,
        minFontSize: 16,
        // maxFontSize: 64,
        maxFontSize: 16,
        texture: {
          // fontFamily: 'Arial, Helvetica, sans-serif',
          // fontFamily: `'SPb', -apple-system, system-ui, Roboto, "Open Sans", "Helvetica Neue", sans-serif`,
          fontFamily: `'Arc', -apple-system, system-ui, Roboto, "Open Sans", "Helvetica Neue", sans-serif`,
          text: (node.name || "").replace(' ', '\n'), //REDO THIS SHIT TEST some nodes has no name?!
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
    !this.initialized && this.callInitListeners()
  }
  dispose() {}
}