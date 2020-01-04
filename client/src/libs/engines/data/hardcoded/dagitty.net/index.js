export default data => {
  let nodes = [],
      edges = []

  data
    .split('\n')
    .filter(line => line.length > 5)
    .forEach(line => {
      if (line.includes('@') && line.includes(' E '))
        nodes.push(line)
      else
        edges.push(line)
    })

  const parsedNodes = nodes.map(node => {
    const nickName = node.split(' E ')[0].replace(/%20/g, ' ')
    const pos = node.split(' E @')[1].split(',')
    return {
      nickName: nickName,
      pos: {
        x: (Number(pos[0]) - .5) * 2,
        y: (.5 - Number(pos[1])),
        z: 0,
      }
    }
  })

  const parsedEdges = edges
    .map((edge, index) => {
      const edgeNodes = edge
        .split(' ')
        .map(node => node.replace(/%20/g, ' '))
      return edgeNodes.slice(1).map(node => ({
        node0: edgeNodes[0],
        node1: node,
        id: index + edgeNodes[0] + node,
      }))
    })
    .reduce((a, b) => [...a, ...b])
  
  return {
    nodes: parsedNodes,
    edges: parsedEdges,
  }
}