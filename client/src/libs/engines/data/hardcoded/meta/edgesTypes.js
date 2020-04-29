import isProduction from 'libs/utils/isProduction'


const edgesTypes = props => {
  const { nodes, edges } = props

  let nodesMapped = nodes.map(node => {
    const mates = node.mates.filter(node => node.type === "KISS")
    const sposes = node.mates.filter(node => node.type === "MARRIED")
    const debated = node.mates.filter(node => node.type === "DEBATED")
    const sex = node.mates.filter(node => node.type === "SEX")
    const date = node.mates.filter(node => node.type === "DATE")
    const breakup = node.mates.filter(node => node.type === "BREAKUP")

    const typeRemover = nodes => nodes.map(node => ({...node, type: undefined}))

    return ({
      ...node,
      connections: node.connections - sposes.length - debated.length - sex.length - date.length - breakup.length,
      // mates: typeRemover(mates),
      // sposes: typeRemover(sposes),
      // debated: typeRemover(debated),
      mates: mates,
      sposes: sposes,
      debated: debated,
      date: date,
      breakup: breakup,
      sex: isProduction() ? [] : sex,
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