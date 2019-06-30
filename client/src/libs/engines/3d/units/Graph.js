import Unit from 'libs/engines/3d/Unit'

import GraphCloth from 'libs/engines/physics/GraphCloth'

export default class Graph extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    this.cube = new THREE.Mesh(geometry, material)
    scene.add(this.cube)

    const { nodes, edges } = this.props.store.get()

    this.edges = edges
    this.nodes = nodes.map(node => ({
      name: node.name,
      pos: node.pos,
    }))

    this.GraphCloth = new GraphCloth({nodes: nodes, edges: edges})

    setInterval(() => {
      this.GraphCloth.recalculate(.033)
      this.nodes = this.GraphCloth.getRecalculatedPos()
        .map((node, index) => ({
          ...this.nodes[index],
          pos: node,
        }))
    }, 500);
  }
  animate() {
  }
  antiInit() {}
}