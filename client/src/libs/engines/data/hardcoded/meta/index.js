import psychic from './mental-iq-social'
import edgesDates from './edgesDates'
import position from 'libs/engines/data/hardcoded/position/02.11.19.json'
// import position from 'libs/engines/data/hardcoded/position/bojack.json'

import { nameToPath } from 'libs/utils/stringTransforms'

export default data => {
  let edges = data.edges.map(edge => {
    let foundEdgeData = edgesDates.filter(edgeData =>
      (edgeData.names[0] === edge.node0 && edgeData.names[1] === edge.node1) ||
      (edgeData.names[0] === edge.node1 && edgeData.names[1] === edge.node0)
    )
    if (foundEdgeData.length > 0)
      return {
        ...edge,
        commited: foundEdgeData[0].commited,
        published: foundEdgeData[0].published,
        told: foundEdgeData[0].told,
        submitter: foundEdgeData[0].submitter,
      }
    return edge
  })

  let nodes = data.nodes.map((node, index) => {
    const psychoIndex = psychic.map(psycho => psycho.nickName.replace(/%20/g, ' ')).indexOf(node.nickName)
    const meta = psychoIndex !== -1 ? psychic[psychoIndex] : {}
    let mates = []

    edges
      .forEach(edge => {
        if (edge.node0 === node.nickName)
          mates.push({
            name: edge.node1,
            date: edge.commited,
          }) 
        if (edge.node1 === node.nickName)
          mates.push({
            name: edge.node0,
            date: edge.commited,
          }) 
      })
    
    const pos = position[index] || {x: 0, y: 0, z: 0}
    const userName = meta.userName ||
      (meta.social && (
        meta.social.inst ||
        (meta.social.vk && (!meta.social.vk.startsWith("id") || meta.social.vk.includes("_")) && meta.social.vk) ||
        meta.social.tg ||
        meta.social.fb ||
        meta.social.twit ||
        (meta.social.yt && meta.social.yt.startsWith("user/") && meta.social.yt.slice(5))
      )) || undefined

    return {
      id: index,
      name: node.nickName,
      posRaw: node.pos,
      pos: pos,
      connections: mates.length + (meta.additionalConnections || 0),
      hiddenConnections: meta.additionalConnections,
      mates: mates,
      userName: userName,
      link: nameToPath(userName || node.nickName),
      social: meta.social,
      iq: meta.iq,
      mentalDisorder: meta.mentalDisorder,
      dead: meta.dead,
      offended: meta.offended,
      avatar: meta.avatar,
    }
  })

  const distribution = Array.from(
    new Set(
      nodes.map(node => node.connections)))
  .sort((a, b) => a - b)

  const nodeUV = weight => distribution.indexOf(weight) / distribution.length

  nodes = nodes.map(node => ({
    ...node,
    uv: nodeUV(node.connections),
  }))

  // console.log(nodes)
  edges = edges.map(edge => {
    let node0 = nodes.map(node => node.name).indexOf(edge.node0)
    let node1 = nodes.map(node => node.name).indexOf(edge.node1)
    node0 = nodes[node0].id
    node1 = nodes[node1].id

    return ({
      ...edge,
      id: node0 + "-" + node1,
      node0: node0,
      node1: node1,
    })
  })

  return {
    nodes: nodes,
    edges: edges,
    distribution: distribution
  }
}