import { nameToPath } from 'libs/utils/stringTransforms'

// import data from './24.11.19.json'
import data from './test.json'


const parseConnections = data => {
  let nodes = data.nodes
    .map(node => {
      const mappedNodes = data.nodes.map(node => node.id)
      const mates = [
        ...data.edges
          .filter(edge => edge.node0 === node.id)
          .map(edge => {
            const index = mappedNodes.indexOf(edge.node1)

            return {
              index: index,
              date: edge.commited,
              edgeId: edge.id,
            }
          }),
        ...data.edges
          .filter(edge => edge.node1 === node.id)
          .map(edge => {
            const index = mappedNodes.indexOf(edge.node0)

            return {
              index: index,
              date: edge.commited,
              edgeId: edge.id,
            }
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
        connections: mates.length + (node.hiddenConnections || 0),
        userName: userName,
        link: nameToPath(userName || node.name),
    }})
    // .filter(node => node.mates.length > 0)
    //TESTT

    nodes = nodes.map(node => ({
      ...node,
      mates: node.mates.map(mate => {
        const mateNode = nodes[mate.index]

        return {
          date: mate.date,
          edgeId: mate.edgeId,
          id: mateNode.id,
          connections: mateNode.connections,
          userName: mateNode.userName,
          name: mateNode.name,
          iq: mateNode.iq,
          mentalDisorder: mateNode.mentalDisorder,
      }})
    }))

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