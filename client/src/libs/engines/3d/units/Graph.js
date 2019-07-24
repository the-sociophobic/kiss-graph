import { MeshLine, MeshLineMaterial } from 'three.meshline'
import TextSprite from 'three.textsprite'

import Unit from 'libs/engines/3d/Unit'

import heatMap from 'img/heat.png'

export default class Graph extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props
    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    // this.cube = new THREE.Mesh(geometry, material)
    // scene.add(this.cube)


    const { nodes, edges } = this.props.store.get()

    this.edges = edges.map(edge => ({
      node0: nodes.map(node => node.name).indexOf(edge.node0),
      node1: nodes.map(node => node.name).indexOf(edge.node1),
    }))
    this.nodes = nodes
    .map(node => ({
      vector: new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z),
      weight: node.connections > 0 ? node.connections : 1,
    }))

    this.geometry = new THREE.BufferGeometry();

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

    this.geometry.addAttribute('position', this.verticesBuffer)

    // const maxWeight = Math.max(...this.nodes.map(node => node.weight))
    // const UVs = new Float32Array(
    //   this.nodes
    //     .map(node => [.5, .3])
    //     .reduce((a, b) => [...a, ...b])
    // )
    // this.geometry.addAttribute('uv', new THREE.BufferAttribute(UVs, 2))

    // var textureLoader = new THREE.TextureLoader()
    //   .load(heatMap, texture => {
        // var material = new THREE.MeshBasicMaterial( { map: texture } );
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    this.line = new THREE.LineSegments( this.geometry, material )
    scene.add( this.line )
      
    // this.billboards = []
    // nodes.forEach(node => {
    //   var billboardGeometry = new THREE.PlaneGeometry(1, 1)
    //   var billboardMaterial = new THREE.MeshBasicMaterial( {color: 0xf00000, side: THREE.DoubleSide} )
    //   var plane = new THREE.Mesh( billboardGeometry, billboardMaterial )
    //   plane.position.set(node.pos.x, node.pos.y, node.pos.z)
    //   scene.add(plane)
    //   this.billboards.push(plane)
    // })
    nodes.forEach(node => {
      let sprite = new TextSprite({
        material: {
          color: 0x000000,
          fog: false,
        },
        redrawInterval: 250,
        textSize: .25,
        texture: {
          fontFamily: 'Arial, Helvetica, sans-serif',
          text: node.name.replace(' ', '\n'),
        },  
      })
      sprite.position.set(node.pos.x, node.pos.y, node.pos.z)
      scene.add(sprite)
    })


        // var material = new MeshLineMaterial({ map: texture })
    
        // var geometry = new THREE.Geometry();
        // for( var j = 0; j < Math.PI * 2; j += 2 * Math.PI / 100 ) {
        //   var v = new THREE.Vector3( Math.cos( j ) * 2, Math.sin( j ), 0 );
        //   geometry.vertices.push( v );
        // }

        // var line = new MeshLine()
        // line.setGeometry(geometry)

        // var mesh = new THREE.Mesh( line.geometry, material ); // this syntax could definitely be improved!
        // scene.add( mesh );




        // var geometry = new THREE.Geometry();
        // geometry.vertices.push(new THREE.Vector3(1, 1, 0))
        // geometry.vertices.push(new THREE.Vector3(0, 1, 0))
        // geometry.vertices.push(new THREE.Vector3(1, 0, 0))
        // geometry.faces.push( new THREE.Face3( 0, 1, 2 ) )
        // geometry.faceVertexUvs[0].push([
        //   new THREE.Vector2(0, 1),
        //   new THREE.Vector2(1, 1),
        //   new THREE.Vector2(1, 0)
        // ])

        // var material = new THREE.MeshBasicMaterial({ map: texture })
        // var mesh = new THREE.Mesh( geometry, material )
        // scene.add(mesh)
        // var wireframe = new THREE.WireframeGeometry( geometry );
        // var line = new THREE.LineSegments( wireframe )
        // scene.add(line)
      // })

  }
  animate() {
    // this.billboards.forEach(billboard =>
    //   billboard.quaternion.copy(this.props.camera.quaternion)
    // )
  }
  dispose() {}
}