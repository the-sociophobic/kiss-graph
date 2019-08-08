import psychic from './mental-iq-social'
import position from 'libs/engines/data/hardcoded/position/03.08.19.json'

export default data => {
  return {
    nodes: data.nodes.map((node, index) => {
      const psychoIndex = psychic.map(psycho => psycho.nickName.replace(/%20/g, ' ')).indexOf(node.nickName)
      const meta = psychoIndex !== -1 ? psychic[psychoIndex] : {}
      let edges = data.edges
        .map(edge =>
          edge.node0 === node.nickName ||
          edge.node1 === node.nickName ? 1 : 0
        )
        .reduce((a, b) => a + b)
      
      edges += (meta.additionalConnections || 0)

      const pos = position[index] || {x: 100, y: 100, z: 100}

      return {
        id: index,
        name: node.nickName,
        posRaw: node.pos,
        pos: pos,
        cameraPosition: [pos.x, pos.y, pos.z + 5],
        cameraTarget: [pos.x, pos.y, pos.z],
        connections: edges,
        mentalDisorder: meta.mentalDisorder,
        iq: meta.iq,
      }
    }),
    // .sort((a, b) => b.connections - a.connections),
    edges: data.edges
  }
}