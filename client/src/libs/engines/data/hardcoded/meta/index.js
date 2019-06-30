import psychic from './mental-iq-social'

export default data => {
  return {
    nodes: data.nodes.map(node => {
      const psychoIndex = psychic.map(psycho => psycho.nickName.replace('%20', ' ')).indexOf(node.nickName)
      const meta = psychoIndex !== -1 ? psychic[psychoIndex] : {}
      let edges = data.edges
        .map(edge =>
          edge.node0 === node.nickName ||
          edge.node1 === node.nickName ? 1 : 0
        )
        .reduce((a, b) => a + b)
      
      if (data.nodes.length > 850)
        edges += (meta.additionalConnections || 0)

      return {
        name: node.nickName,
        pos: node.pos,
        connections: edges,
        mentalDisorder: meta.mentalDisorder,
        iq: meta.iq,
      }
    })
    .sort((a, b) => b.connections - a.connections),
    edges: data.edges
  }
}