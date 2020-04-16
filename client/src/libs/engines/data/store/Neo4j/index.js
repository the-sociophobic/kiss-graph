import axios from 'axios'

import {
  encode,
  encodeMany,
  encodeJSONstring,
  decode,
  decodeMany
} from 'libs/engines/data/store/models'

import edgeModel from 'libs/engines/data/store/models/edge'
import personModel from 'libs/engines/data/store/models/person'
import conceptModel from 'libs/engines/data/store/models/concept'


const post = async statements =>
  axios
    .post("http://localhost:7474/db/data/transaction/commit",
      {statements: statements},
      {auth: {
        username: "neo4j",
        password: "dermo123"
      }}
    )

const getNodes = async () => {
  const connectedNodes = await post([{
    statement: `
      MATCH (node:Person)
      MATCH (node)-[edge:KISS]-(mate:Person)
      MATCH (mate)-[mateEdges:KISS]-(mateConnections:Person)
      WITH {
        date: edge.commited,
        edgeId: id(edge),
        id: id(mate),
        connections: count(mateConnections) + COALESCE(mate.hiddenConnections, 0),
        userName: mate.userName,
        name: mate.name,
        iq: mate.iq,
        mentalDisorder: mate.mentalDisorder,
        emoji: mate.emoji,
        gender: mate.gender
      } as mates, node as node

      WITH node {
        .*,
        id: id(node),
        connections: count(mates) + COALESCE(node.hiddenConnections, 0),
        mates: collect(mates),
        iq: coalesce((node.iq2 + toInteger(node.iq)) / 2, node.iq)
      } AS node
      RETURN node
    `
  }])
  const singleNodes = await post([{
    statement: `
      MATCH (node:Person)
      WHERE NOT (node)-[:KISS]-(:Person)
      WITH node {
        .*,
        id: id(node),
        connections: COALESCE(node.hiddenConnections, 0),
        mates: []
      } AS node
      RETURN node
    `
  }])

  return [
    ...decodeMany(personModel, connectedNodes),
    ...decodeMany(personModel, singleNodes),
  ]
}
const getNode = async id => {
  const connectedNodes = await post([{
    statement: `
      MATCH (node:Person)
      WHERE ID(node) = ${id}
      MATCH (node)-[edge:KISS]-(mate:Person)
      MATCH (mate)-[mateEdges:KISS]-(mateConnections:Person)
      WITH {
        date: edge.commited,
        edgeId: id(edge),
        id: id(mate),
        connections: count(mateConnections) + COALESCE(mate.hiddenConnections, 0),
        userName: mate.userName,
        name: mate.name,
        iq: mate.iq,
        mentalDisorder: mate.mentalDisorder,
        emoji: mate.emoji,
        gender: mate.gender
      } as mates, node as node
      WITH node {
        .*,
        id: id(node),
        connections: count(mates) + COALESCE(node.hiddenConnections, 0),
        mates: collect(mates)
      } AS node
      RETURN node
    `
  }])
  const singleNodes = await post([{
    statement: `
      MATCH (node:Person)
      WHERE ID(node) = ${id} AND NOT (node)-[:KISS]-(:Person)
      WITH node {
        .*,
        id: id(node),
        connections: COALESCE(node.hiddenConnections, 0),
        mates: []
      } AS node
      RETURN node
    `
  }])
  const decodedConnecttedNodes = decodeMany(personModel, connectedNodes)
  const decodedSingleNodes = decodeMany(personModel, singleNodes)

  const foundArray = [
    ...(Array.isArray(decodedConnecttedNodes) ? decodedConnecttedNodes : []),
    ...(Array.isArray(decodedSingleNodes) ? decodedSingleNodes : []),
  ]

  return foundArray[0]
}

const getEdges = async () =>
  decodeMany(
    edgeModel, 
    await post([{
      statement: `
        MATCH (node0:Person)-[edge:KISS]->(node1:Person)
        WITH edge {
          .*,
          id: id(edge),
          node0: id(node0),
          node1: id(node1)
        } AS edge
        RETURN edge
      `
    }])
  )

const createNode = async node => {
  const resNode = await post([{
    statement: `
      CREATE (node:Person ${encodeJSONstring(encode(personModel, node))})
      WITH node {
        .*,
        id: id(node),
        connections: COALESCE(node.hiddenConnections, 0),
        mates: []
      } AS node
      RETURN node
    `
  }])

  return decodeMany(personModel, resNode)[0]
}
const createEdge = async edge => {
  const resEdge = await post([{
    statement: `
      MATCH (node0)
      WHERE ID(node0) = ${edge.node0}
      MATCH (node1)
      WHERE ID(node1) = ${edge.node1}
      CREATE (node0)-[edge:KISS ${encodeJSONstring(encode(edgeModel, edge))}]->(node1)
      WITH edge {
        .*,
        id: id(edge),
        node0: id(node0),
        node1: id(node1)
      } AS edge
      RETURN edge
  `
  }])

  return decodeMany(edgeModel, resEdge)[0]
}

const setNode = async node => {
  const nodeId = await post([{
    statement: `
      MATCH (node:Person)
      WHERE ID(node) = ${node.id}
      SET node = {}
      SET node = ${encodeJSONstring(encode(personModel, node))}
      RETURN {id: ID(node)}
    `
  }])

  return await getNode(nodeId.data.results[0].data[0].row[0].id)
}
const updateNodes = async nodes => {
  const nodess = nodes
    .filter(node => node.id !== "undefined" && typeof node.id !== "undefined")
    .map(node =>
      ({
        statement: `
          MATCH (node:Person)
          WHERE ID(node) = ${node.id}
          SET node = {}
          SET node = ${encodeJSONstring(encode(personModel, node))}
          RETURN {id: ID(node)}
        `
      })
    )

  const res = await post(nodess)
  return res
}

const setEdge = async edge => {
  const resEdge = await post([{
    statement: `
      MATCH ()-[edge:KISS]-()
      WHERE ID(edge) = ${edge.id}
      SET edge = ${encodeJSONstring(encode(edgeModel, edge))}
      RETURN {id: ID(edge)}
  `
  }])

  return decodeMany(edgeModel, resEdge)
}

const deleteNode = async node =>
  await post([{
    statement: `
      MATCH (node:Person)
      WHERE ID(node) = ${node.id}
      DETACH DELETE node
    `
  }])
const deleteEdge = async edge =>
  await post([{
    statement: `
      MATCH ()-[edge:KISS]-()
      WHERE ID(edge) = ${edge.id}
      DELETE edge
    `
  }])


export {
  getNodes,
  getEdges,
  createNode,
  createEdge,
  setNode,
  updateNodes,
  setEdge,
  deleteNode,
  deleteEdge,
}