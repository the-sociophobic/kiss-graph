import Unit from 'libs/engines/3d/Unit'
import GraphCloth from './GraphCloth'

export default class GraphPosCalculator extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props
    const { nodes, edges } = this.props.store.get()

    this.edges = edges.map(edge => ({
      node0: nodes.map(node => node.name).indexOf(edge.node0),
      node1: nodes.map(node => node.name).indexOf(edge.node1),
    }))
    this.nodes = nodes
    .filter(node => node.connections > 0) //TODO TOFIX
    .map(node => ({
      vector: //node.pos ? 
      // new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z)
      // :
      new THREE.Vector3(
        // node.posRaw.x * 2.15,
        // node.posRaw.y * 2.15,
        // Math.random() * (60 - node.connections) / 15
        node.pos.x,
        node.pos.y,
        node.pos.z
      ),
      weight: node.connections > 0 ? node.connections : 1, //TODO
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

    this.geometry.setAttribute('position', this.verticesBuffer)

    this.deltaTime = .005
    this.frameNumber = 0
    setInterval(() => {
      this.frameNumber++
      if (this.frameNumber === 300)
        this.deltaTime *= 1.5
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
      this.verticesBuffer.needsUpdate = true

      if (this.frameNumber === 3000)
        this.props.sendData(
          JSON.stringify(positions.map(pos => ({
            x: pos[0],
            y: pos[1],
            z: pos[2],
          })))
        )
      
      if (this.frameNumber % 100 === 0)
        console.log(this.frameNumber)


    }, 225)

    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    this.line = new THREE.LineSegments( this.geometry, material );
    scene.add( this.line )
  }
  animate() {
  }
  dispose() {}
}