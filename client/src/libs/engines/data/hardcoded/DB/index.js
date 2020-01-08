import { nameToPath } from 'libs/utils/stringTransforms'

import data from './24.11.19.json'


const parseConnections = data => {
  let nodes = data.nodes
    .map(node => {
      const mappedNodes = data.nodes.map(node => node.id)
      const mates = [
        ...data.edges
          .filter(edge => edge.node0 === node.id)
          .map(edge => {
            const index = mappedNodes.indexOf(edge.node1)

            return data.nodes[index]
          }),
        ...data.edges
          .filter(edge => edge.node1 === node.id)
          .map(edge => {
            const index = mappedNodes.indexOf(edge.node0)

            return data.nodes[index]
          }),
      ]

      const userName = node.userName ||
        (node.social && (
          node.social.inst ||
          (node.social.vk && (!node.social.vk.startsWith("id") || node.social.vk.includes("_")) && node.social.vk) ||
          node.social.tg ||
          node.social.fb ||
          node.social.twit ||
          (node.social.yt && node.social.yt.startsWith("user/") && node.social.yt.slice(5))
        )) || undefined


      return {
        ...node,
        mates: mates,
        connections: mates.length + (node.additionalConnections || 0),
        userName: userName,
        link: nameToPath(userName || node.name),
    }})
    .filter(node => node.mates.length > 0)

    const distribution = Array.from(new Set(nodes.map(node => node.connections)))
      .sort((a, b) => a - b)
  
    const nodeUV = weight => distribution.indexOf(weight) / distribution.length
  
    nodes = nodes.map(node => ({
      ...node,
      uv: nodeUV(node.connections),
    }))

    return {
      nodes: nodes,
      edges: data.edges,
      distribution: distribution,
    }
  }
   

export {
  data,
  parseConnections,
}