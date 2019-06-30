import Unit from 'libs/engines/3d/Unit'

import GraphCloth from 'libs/engines/physics/GraphCloth'

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
    this.nodes = nodes.map(node => ({
      ...node.pos,
      weight: node.connections,
    }))

    this.GraphCloth = new GraphCloth({
      nodes: this.nodes,
      edges: this.edges
    })
    setInterval(() => {
      this.GraphCloth.recalculate(.033)
      // this.nodes = this.GraphCloth.getRecalculatedPos()
      //   .map((node, index) => ({
      //     ...this.nodes[index],
      //     pos: node,
      //   }))
    }, 500);

    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geometry = new THREE.BufferGeometry();

    const positions = this.GraphCloth.getRecalculatedPos()
    var vertices = new Float32Array(
      this.edges
        .map(edge => [
          ...positions[edge.node0],
          ...positions[edge.node1],
        ])
        .reduce((a, b) => [...a, ...b])
    )

    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    this.line = new THREE.LineSegments( geometry, material );
    scene.add( this.line )
  }
  animate() {
  }
  antiInit() {}
}