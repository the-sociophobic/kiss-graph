import psychic from './mental-iq-social'
import position from 'libs/engines/data/hardcoded/position/23.07.19.json'

export default data => {
  return {
    nodes: data.nodes.map((node, index) => {
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
        posRaw: node.pos,
        pos: position[index] || {x: 100, y: 100, z: 100},
        connections: edges,
        mentalDisorder: meta.mentalDisorder,
        iq: meta.iq,
      }
    }),
    // .sort((a, b) => b.connections - a.connections),
    edges: data.edges
  }
}