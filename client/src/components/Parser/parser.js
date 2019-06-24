export default data => {
  const nodes = data
    .split('\n')
    .filter(line => line.includes('@'))
  const edges = data
    .split('\n')
    .filter(line => line.length > 5 && !line.includes('@'))

  const parsedNodes = nodes.map(node => {
    const nickName = node.split(' E ')[0].replace('%20', ' ')
    // const pos = node.split(' E @')[1].split(',')
    const pos = [0, 0]
    return {
      nickName: nickName,
      firstName: nickName.split(' ')[0],
      lastName: nickName.includes(' ') ?
        nickName.split(' ').slice(1).reduce((a, b) => a + ' ' + b)
        : '',
        pos: {
          X: pos[0],
          Y: pos[1],
        }
    }
  })

  const parsedEdges = edges
    .map(edge => {
      const edgeNodes = edge
        .split(' ')
        .map(node => node.replace('%20', ' '))
      return edgeNodes.slice(1).map(node => ({
        node0: edgeNodes[0],
        node1: node,
      }))
    })
    .reduce((a, b) => [...a, ...b])
  
  return {
    nodes: parsedNodes,
    edges: parsedEdges,
  }
}