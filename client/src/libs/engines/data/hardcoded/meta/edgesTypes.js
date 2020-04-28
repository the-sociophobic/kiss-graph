const edgesTypes = props => {
  const { nodes, edges } = props

  let nodesMapped = nodes.map(node => {
    const mates = node.mates.filter(node => node.type === "KISS")
    const sposes = node.mates.filter(node => node.type === "MARRIED")
    const debated = node.mates.filter(node => node.type === "DEBATED")
    const sex = node.mates.filter(node => node.type === "SEX")

    const typeRemover = nodes => nodes.map(node => ({...node, type: undefined}))

    return ({
      ...node,
      connections: node.connections - sposes.length - debated.length - sex.length,
      // mates: typeRemover(mates),
      // sposes: typeRemover(sposes),
      // debated: typeRemover(debated),
      mates: mates,
      sposes: sposes,
      debated: debated,
      // sex: typeRemover(sex),
    })
  })

  // let edgesMapped = edges.filter(edge => edge.type === "KISS" || edge.type === "DEBATED" || edge.type === "SEX")
  let edgesMapped = edges

  return ({
    nodes: nodesMapped,
    edges: edgesMapped,
  })
}
  

export default edgesTypes