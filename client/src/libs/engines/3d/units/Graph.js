import { MeshLine, MeshLineMaterial } from 'three.meshline'

import Unit from 'libs/engines/3d/Unit'
import GraphCloth from 'libs/engines/physics/GraphCloth'

import heatMap from 'img/heat.png'
import { isThisSecond } from 'date-fns';

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
    .filter(node => node.connections > 0)
    .map(node => ({
      // vector: new THREE.Vector3(node.pos.X, node.pos.Y, node.pos.Z),
      vector: new THREE.Vector3(
        node.pos.X * 2.15,
        node.pos.Y * 2.15,
        Math.random() * (60 - node.connections) / 15
      ),
      weight: node.connections,
    }))

    this.GraphCloth = new GraphCloth({
      nodes: this.nodes,
      edges: this.edges,
    })

    this.geometry = new THREE.BufferGeometry();

    const positions = this.GraphCloth.getRecalculatedPos()
    const vertices = new Float32Array(
      this.edges
        .map(edge => [
          ...positions[edge.node0],
          ...positions[edge.node1],
        ])
        .reduce((a, b) => [...a, ...b])
    )
    this.verticesBuffer = new THREE.BufferAttribute(vertices, 3)
    this.verticesBuffer.dynamic = true

    this.geometry.addAttribute('position', this.verticesBuffer)

    const maxWeight = Math.max(...this.nodes.map(node => node.weight))
    const UVs = new Float32Array(
      this.nodes
        .map(node => [.5, .3])
        .reduce((a, b) => [...a, ...b])
    )
    this.geometry.addAttribute('uv', new THREE.BufferAttribute(UVs, 2))

    this.deltaTime = .005
    this.frameNumber = 0
    setInterval(() => {
      this.frameNumber++
      // if (this.frameNumber === 50)
      //   this.deltaTime *= 1.2
      // if (this.frameNumber === 100)
      //   this.deltaTime *= 1.2
      // if (this.frameNumber === 150)
      //   this.deltaTime *= 1.2
      if (this.frameNumber === 300)
        this.deltaTime *= 1.5
      // if (this.frameNumber === 450)
      //   this.deltaTime *= 2
      if (this.frameNumber === 600)
        this.deltaTime *= 1.5

      this.GraphCloth.recalculate(this.deltaTime)
      const positions = this.GraphCloth.getRecalculatedPos()
      const vertices = new Float32Array(
        this.edges
          .map(edge => [
            ...positions[edge.node0],
            ...positions[edge.node1],
          ])
          .reduce((a, b) => [...a, ...b])
      )
      this.verticesBuffer.array = vertices
      // console.log(vertices)
      this.verticesBuffer.needsUpdate = true
      // this.geometry.attributes.position.needsUpdate = true
    }, 80)


    var textureLoader = new THREE.TextureLoader()
      .load(heatMap, texture => {
        // var material = new THREE.MeshBasicMaterial( { map: texture } );
        var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        this.line = new THREE.LineSegments( this.geometry, material );
        scene.add( this.line )



        // var material = new MeshLineMaterial({ map: texture });
    
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
      })
  }
  animate() {
  }
  antiInit() {}
}