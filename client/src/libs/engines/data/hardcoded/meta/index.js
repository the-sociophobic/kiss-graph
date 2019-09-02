import psychic from './mental-iq-social'
import position from 'libs/engines/data/hardcoded/position/29.08.19.json'
// import position from 'libs/engines/data/hardcoded/position/bojack.json'

import colorFromWeight from 'libs/utils/colorFromWeight'

export default data => {
  let nodes = data.nodes.map((node, index) => {
    const psychoIndex = psychic.map(psycho => psycho.nickName.replace(/%20/g, ' ')).indexOf(node.nickName)
    const meta = psychoIndex !== -1 ? psychic[psychoIndex] : {}
    let mates = []
    data.edges
      .forEach(edge => {
        if (edge.node0 === node.nickName)
          mates.push(edge.node1) 
        if (edge.node1 === node.nickName)
          mates.push(edge.node0) 
      })
    
    const pos = position[index] || {x: 0, y: 0, z: 0}

    return {
      id: index,
      name: node.nickName,
      posRaw: node.pos,
      pos: pos,
      cameraPosition: [pos.x, pos.y, pos.z + 5],
      cameraTarget: [pos.x, pos.y, pos.z],
      connections: mates.length + (meta.additionalConnections || 0),
      hiddenConnections: meta.additionalConnections,
      mates: mates,
      mentalDisorder: meta.mentalDisorder,
      iq: meta.iq,
      userName: meta.userName || (meta.social && (meta.social.inst || meta.social.vk)) || undefined,
      avatar: meta.avatar,
      offended: meta.offended,
      deceased: meta.deceased,
    }
  })
  const edges = data.edges
  const distribution = Array.from(
    new Set(
      nodes.map(node => node.connections)))
  .sort((a, b) => a - b)

  const positionInArray = (array, value) => {
    let i
    for (i = 0; value > array[i]; i++)
      ;
    return i
  }
  const nodeUV = weight => positionInArray(distribution, weight) / distribution.length

  nodes = nodes.map(node => ({
    ...node,
    uv: nodeUV(node.connections),
    color: colorFromWeight(nodeUV(node.connections))
  }))

  return {
    nodes: nodes,
    edges: edges,
    distribution: distribution
  }
}