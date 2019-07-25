import TextSprite from 'three.textsprite'

import Unit from 'libs/engines/3d/Unit'

import heatMap from 'img/heat.png'

const cylinderVertices = (R, length, segments, weight0, weight1) => {
  var vertices = [segments * 2 * 3]
  var uvs = [segments * 2 * 2]

  for (var i = 0; i < segments; i++) {
    const angle = Math.PI * 2 * i / segments
    const x = Math.sin(angle) * R
    const y = length / 2
    const z = Math.cos(angle) * R

    vertices[i * 6]     = x
    vertices[i * 6 + 1] = 0
    vertices[i * 6 + 2] = z
    vertices[i * 6 + 3] = x
    vertices[i * 6 + 4] = y
    vertices[i * 6 + 5] = z

    uvs[i * 4]     = weight0
    uvs[i * 4 + 1] = 0
    uvs[i * 4 + 2] = weight1
    uvs[i * 4 + 3] = 0
  }

  return {
    vertices: new Float32Array(vertices),
    uvs: new Float32Array(uvs),
  }
}

const cylinderGraph = (THREE, nodes, edges) => {
  const up = new THREE.Vector3(0, 1, 0)
  edges.forEach(edge => {
    const node0 = nodes[edge.node0]
    const node1 = nodes[edge.node1]
    const vec0 = new THREE.Vector3(node0.pos)
    const vec1 = new THREE.Vector3(node1.pos)
    const normal = new THREE.Vector3().subVectors(vec1, vec0).normalize()

  })
}

export default class Graph extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props
    const { nodes, edges } = this.props.store.get()

    this.edges = edges.map(edge => ({
      node0: nodes.map(node => node.name).indexOf(edge.node0),
      node1: nodes.map(node => node.name).indexOf(edge.node1),
    }))


    const maxWeight = Math.max(...nodes.map(node => node.connections))
    const colorsArray = [0x990099, 0x0000ff, 0x00ff00, 0xffff00, 0xffff00, 0xff0000, 0xffffff]
    this.nodes = nodes
    .map(node => {
      // const weight = node.connections > 0 ? node.connections : 1
      const weight = node.connections

      // const floatSc = weight / maxWeight * colorsArray.length - 1
      // const index = Math.floor(floatSc)
      // const subs = floatSc - index
      // const color = colorsArray[index] * subs + colorsArray[index + 1] * (1 - subs)

      return ({
        vector: new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z),
        weight: weight,
        color: weight / maxWeight,
      })
    })

    this.bufferGeometry = new THREE.BufferGeometry();

    const vertices = new Float32Array(
      this.edges
        .map(edge => [
          nodes[edge.node0].pos.x, nodes[edge.node0].pos.y, nodes[edge.node0].pos.z,
          nodes[edge.node1].pos.x, nodes[edge.node1].pos.y, nodes[edge.node1].pos.z,
        ])
        .reduce((a, b) => [...a, ...b])
    )
    this.verticesBuffer = new THREE.BufferAttribute(vertices, 3)
    this.verticesBuffer.dynamic = true

    this.bufferGeometry.addAttribute('position', this.verticesBuffer)

    // const colors = new Float32Array(
    //   this.edges
    //     .map(edge => {
    //       const node0 = this.nodes[edge.node0]
    //       const node1 = this.nodes[edge.node1]
          
    //       return [
    //         ((node0.color & 0xff0000) >> 8) / 16,
    //         ((node0.color & 0x00ff00) >> 4) / 16,
    //         ((node0.color & 0x0000ff)) / 16,
    //         ((node1.color & 0xff0000) >> 8) / 16,
    //         ((node1.color & 0x00ff00) >> 4) / 16,
    //         ((node1.color & 0x0000ff)) / 16,
    //       ]
    //     })
    //     .reduce((a, b) => [...a, ...b])
    // )
    // this.bufferGeometry.addAttribute('color', new THREE.BufferAttribute(colors, 3))


    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    // var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
    this.line = new THREE.LineSegments( this.bufferGeometry, material )
    scene.add( this.line )
      
    nodes.forEach((node, index) => {
      let sprite = new TextSprite({
        material: {
          color: 0x000000,
          fog: false,
        },
        redrawInterval: 500,
        textSize: .25,
        minFontSize: 16,
        maxFontSize: 128,
        texture: {
          fontFamily: 'Arial, Helvetica, sans-serif',
          text: node.name.replace(' ', '\n') + " " + this.nodes[index].weight,
        },  
      })
      sprite.position.set(node.pos.x, node.pos.y, node.pos.z)
      scene.add(sprite)
    })


    // var textureLoader = new THREE.TextureLoader()
    //   .load(heatMap, texture => {
    //     // var material = new MeshLineMaterial({ color: 0x0000ff })
    //     var material = new MeshLineMaterial({ map: texture, useMap: true, sizeAttenuation: 0, lineWidth: .1 })
    //     var geometry = new THREE.Geometry().fromBufferGeometry( this.bufferGeometry )
    //     var line = new MeshLine()
    //     line.setGeometry(geometry, p => .1)

    //     var mesh = new THREE.Mesh( line.geometry, material ) // this syntax could definitely be improved!
    //     scene.add( mesh )
    //   })

  }
  animate() {
  }
  dispose() {}
}