import axios from 'axios'

import nodeModel from 'libs/engines/data/store/models/node'
import edgeModel from 'libs/engines/data/store/models/edge'
import {
  encode,
  encodeMany,
  decodeMany
} from 'libs/engines/data/store/models'

import copyToClipboard from 'libs/utils/copyToClipboard'
import { data, parseConnections } from 'libs/engines/data/hardcoded/DB'
import filterKeys from 'libs/utils/filterKeys'


const post = async statements =>
  axios
    .post("http://localhost:7474/db/data/transaction/commit",
      {statements: statements},
      {auth: {
        username: "neo4j",
        password: "dermo123"
      }}
    )

const getNodes = async () =>
  decodeMany(
    nodeModel,
    await post([{
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
          mentalDisorder: mate.mentalDisorder
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
  )


const getEdges = async () => {
  const edges = await post([{
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
  return decodeMany(edgeModel, edges)
}

class store {
  init = async () => {
    this.initListeners = []

    this.metaData = {
      nodes: await getNodes(),
      edges: await getEdges(),
    }
    const createSortedSet = (objectsArray, property) =>
      Array.from(
        new Set(objectsArray.map(object => object[property]))
      ).sort((a, b) => a - b)

    this.weightSet = createSortedSet(this.metaData.nodes, "connections")
    this.iqSet = createSortedSet(this.metaData.nodes, "iq")
    this.mentalDisorderSet = createSortedSet(this.metaData.nodes, "mentalDisorder")

    //REDO THIS SHIT
    const nodeUV = (weight, distribution) => distribution.indexOf(weight) / distribution.length
    this.metaData.nodes = this.metaData.nodes.map(node => ({
      ...node,
      uv: nodeUV(node.connections, this.weightSet),
    }))

    this.initListeners.forEach(listener => listener())
  }

  constructor(props) {
    this.props = props
    this.data = data
    // this.metaData = parseConnections(data)
    this.metaData = {
      nodes: [],
      edges: [],
    }

    this.init()
  }

  addInitListener = fn =>
    this.initListeners = [
      ...this.initListeners,
      fn
    ]

  get = props => {
    if (typeof props === "undefined")
      return {
        nodesTotalLength: () => this.data.nodes.length,
        edgesTotalLength: () => this.data.edges.length,
        weightSet: this.weightSet,
        maxWeigth: this.maxWeight,
        nodes: this.metaData.nodes,
        edges: this.metaData.edges,
      }

    
    //THIS SOMEHOW DOESN'T WORK
    // const possibleSearchKeys = ["id", "name", "userName", "link", "edgeId"]
    // // const { id, name, userName, link, edgeId } = props //google it
    // let { data, metaData } = this

    // if (Object.keys(props).length === 0)
    //   return null

    // if (typeof props.edgeId !== "undefined") {
    //   const index = metaData.edges
    //     .map(edge => edge.id)
    //     .indexOf(props.edgeId)
    //   if (index !== -1)
    //     return metaData.nodes[index]
    // }
    // Object.keys(props).forEach(key => {
    //   if (typeof props[key] !== "undefined") {
    //     const index = metaData.nodes
    //       .map(node => node[key])
    //       .indexOf(props[key])
    //     if (index !== -1)
    //       return metaData.nodes[index]
    //   }  
    // })
    // return null

    const { id, name, userName, link, edgeId } = props
    let { data, metaData } = this

    if (typeof id === "undefined" &&
        typeof name === "undefined" &&
        typeof userName === "undefined" &&
        typeof link === "undefined" &&
        typeof edgeId === "undefined")
      return metaData

    if (typeof id !== "undefined") {
      const index = metaData.nodes
        .map(node => node.id)
        .indexOf(id)
      if (index !== -1)
        return metaData.nodes[index]
      return null
    }

    if (typeof userName !== "undefined") {
      const index = metaData.nodes
        .map(node => node.userName)
        .indexOf(userName)
      if (index !== -1)
        return metaData.nodes[index]
      return null
    }

    if (typeof link !== "undefined") {
      const index = metaData.nodes
        .map(node => node.link)
        .indexOf(link)
      if (index !== -1)
        return metaData.nodes[index]
      return null
    }

    if (typeof name !== "undefined") {
      const index = metaData.nodes
        .map(node => node.name)
        .indexOf(name)
      if (index !== -1)
        return metaData.nodes[index]
      return null
    }

    if (typeof edgeId !== "undefined") {
      const index = metaData.edges
        .map(edge => edge.id)
        .indexOf(edgeId)
      if (index !== -1)
        return metaData.edges[index]
      return null
    }

    return null
  }

  search = props => {
    const limit = 7
    let filteredNodes
    if (props.link) {
      const index = this.metaData.nodes
        .map(node => node.link)
        .indexOf(props.link)
      if (index !== -1)
        return [this.metaData.nodes[index]]
    } else {
      filteredNodes = this.metaData.nodes.filter(node =>
        Object.keys(props).map(key =>
          node[key] && node[key]
            .toLowerCase()
            .split(/_| |-|\./gm)
            .map(word => word.startsWith(props[key].toLowerCase()))
            .reduce((a, b) => a || b)
        )
        .reduce((a, b) => a || b)
      ) || []
    }

    if (filteredNodes.length < limit) {
      let badlyFilteredNodes = this.metaData.nodes.filter(node =>
        !filteredNodes
          .map(node => node.id)
          .includes(node.id) &&
        Object.keys(props).map(key =>
          node[key] && node[key]
            .toLowerCase()
            .includes(props[key].toLowerCase())
        )
        .reduce((a, b) => a || b)
      ) || []
      filteredNodes = [
        ...filteredNodes,
        ...badlyFilteredNodes.slice(0, limit - filteredNodes.length)
      ]
    }

    return filteredNodes
  }

  push = props => {
    console.log(props)
    //push edge
    if (Object.keys(props).includes("node0")) {
      const edge = filterKeys(props, edgeModel)
      console.log(edge)
      //update
      const index = this.data.edges.map(edge => edge.id).indexOf(edge.id)
      if (index !== -1) {
        this.data.edges = [
          ...this.data.edges.slice(0, index),
          edge,
          ...this.data.edges.slice(index + 1),
        ]
        this.metaData.edges = [
          ...this.metaData.edges.slice(0, index),
          edge,
          ...this.metaData.edges.slice(index + 1),
        ]
      } else
        this.data.edges.push(edge)
    }
    //push node
    else {
      const node = filterKeys(props, nodeModel)
      console.log(node)
      //update
      if (node.id < this.data.nodes.length) {
        const index = this.data.nodes.map(edge => edge.id).indexOf(node.id)

        this.data.nodes = [
          ...this.data.nodes.slice(0, index),
          node,
          ...this.data.nodes.slice(index + 1),
        ]
        this.metaData.nodes = [
          ...this.metaData.nodes.slice(0, index),
          node,
          ...this.metaData.nodes.slice(index + 1),
        ]
      } else 
        this.data.nodes.push(node)
    }
  }

  copyData = () => copyToClipboard(JSON.stringify(this.data))
  // copyData = () => {
  //   const data = {
  //     nodes: this.metaData.nodes.map(node => filterKeys(node, nodeModel)),
  //     edges: this.metaData.edges.map(edge => filterKeys(edge, edgeModel)),
  //   }

  //   copyToClipboard(JSON.stringify(data))    
  // }

}

export default store