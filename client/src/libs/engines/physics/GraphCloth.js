import PhysicalUnit from './PhysicalUnit'

export default class GraphCloth extends PhysicalUnit {
  constructor(props) {
    super(props)

    this.nodes = props.nodes
    this.edges = props.edges
  }

  recalculate = deltaTime => {
    const { nodes, edges } = this


    this.nodes = nodes
  }

  getRecalculatedPos = () => this.nodes
    .map(node => ([
      node.X,
      node.Y,
      node.Z,
    ]))
    // .reduce((a, b) => [...a, ...b])
}