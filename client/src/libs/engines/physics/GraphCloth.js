import PhysicalUnit from './PhysicalUnit'

export default class GraphCloth extends PhysicalUnit {
  constructor(props) {
    super(props)

    this.nodes = props.nodes.map(node => ({
      ...node.pos,
      weight: node.connections
    }))
    this.edges = props.edges.map(edge => ({
      node0: props.nodes.map(node => node.name).indexOf(edge.node0),
      node1: props.nodes.map(node => node.name).indexOf(edge.node1),
    }))
  }

  recalculate = deltaTime => {
    const { nodes, edges } = this


    this.nodes = nodes
  }

  getRecalculatedPos = () => this.nodes.map(node => ({
    X: node.X,
    Y: node.Y,
    Z: node.Z,
  }))
}