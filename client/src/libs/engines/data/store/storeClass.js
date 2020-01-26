import {
  getNodes,
  getEdges,
  createNode,
  createEdge,
  setNode,
  setEdge,
} from 'libs/engines/data/store/Neo4j'
import nodeModel from 'libs/engines/data/store/models/node'
import edgeModel from 'libs/engines/data/store/models/edge'
import { decode } from 'libs/engines/data/store/models'

import {
  data,
  parseConnections
} from 'libs/engines/data/hardcoded/DB'

import copyToClipboard from 'libs/utils/copyToClipboard'
import listenersClass from 'libs/utils/listenersClass'
import createSortedSet from 'libs/utils/createSortedSet'
import filterKeys from 'libs/utils/filterKeys'
import isProduction from 'libs/utils/isProduction'
import { nameToPath } from 'libs/utils/stringTransforms'


class store extends listenersClass {
  constructor(props) {
    super(props)
    this.props = props
    this.data = data //ORIGINAL DATA
    this.metaData = {
      nodes: [],
      edges: [],
    }

    this.init()
  }

  init = async () => {
    if (isProduction())
      this.metaData = parseConnections(data)
    else
      this.metaData = {
        nodes: await getNodes(),
        edges: await getEdges(),
      }

      console.log(this.metaData.nodes.length)

    //CALC SECONDARY DATA
    this.iqSet = createSortedSet(this.metaData.nodes, "iq")
    this.weightSet = createSortedSet(this.metaData.nodes, "connections")
    this.mentalDisorderSet = createSortedSet(this.metaData.nodes, "mentalDisorder")
  
    const calcNodeUV = (weight, distribution) =>
      distribution.indexOf(weight) / distribution.length

    //REDO THIS SHIT: userName saved in BD, so should be calculated when node created/updated
    const calcUserName = node =>
      node.userName ||
      (node.social && (
        node.social.inst ||
        (node.social.vk && (!node.social.vk.startsWith("id") || node.social.vk.includes("_")) && node.social.vk) ||
        node.social.tg ||
        node.social.fb ||
        node.social.twit ||
        (node.social.yt && node.social.yt.startsWith("user/") && node.social.yt.slice(5))
      )) || undefined

    const calcLink = node =>
      nameToPath(calcUserName(node) || node.name)

    this.metaData.nodes = this.metaData.nodes.map(node => ({
      ...node,
      uv: calcNodeUV(node.connections, this.weightSet),
      userName: calcUserName(node),
      link: calcLink(node),
    }))

    //TELL EVERYONE DATA IS READY
    this.callInitListeners()
  }

  get = props => {
    const defaultData = {
      iqSet: this.iqSet,
      weightSet: this.weightSet,
      mentalDisorderSet: this.mentalDisorderSet,
      nodes: this.metaData.nodes,
      edges: this.metaData.edges,
    }

    if (typeof props === "undefined")
      return defaultData
    
    // const possibleSearchKeys = ["id", "name", "userName", "link", "edgeId"]
    let { metaData } = this

    let result    
    if (typeof props.edgeId !== "undefined") {
      const index = metaData.edges
        .map(edge => edge.id)
        .indexOf(props.edgeId)
      if (index !== -1)
        result = metaData.edges[index]
    }
    
    Object.keys(props).forEach(key => {
      if (typeof props[key] !== "undefined") {
        const index = metaData.nodes
          .map(node => node[key])
          .indexOf(props[key])
        if (index !== -1)
          result = metaData.nodes[index]
      }  
    })
    if (typeof result !== "undefined")
      return result
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

  push = async props => {
    let res
    let isEdge = Object.keys(props).includes("node0")

    if (isEdge) {
      if (typeof props.id === "undefined")
        res = createEdge(props)
      else
        res = setEdge(props)
    } else {
      if (typeof props.id === "undefined")
        res = createNode(props)
      else
        res = setNode(props)
    }
    await res
    this.callUpdateListeners()
    console.log(res)
    return decode(isEdge ? edgeModel : nodeModel, res)
    // console.log(props)
    // //push edge
    // if (Object.keys(props).includes("node0")) {
    //   const edge = filterKeys(props, edgeModel)
    //   console.log(edge)
    //   //update
    //   const index = this.data.edges.map(edge => edge.id).indexOf(edge.id)
    //   if (index !== -1) {
    //     this.data.edges = [
    //       ...this.data.edges.slice(0, index),
    //       edge,
    //       ...this.data.edges.slice(index + 1),
    //     ]
    //     this.metaData.edges = [
    //       ...this.metaData.edges.slice(0, index),
    //       edge,
    //       ...this.metaData.edges.slice(index + 1),
    //     ]
    //   } else
    //     this.data.edges.push(edge)
    // }
    // //push node
    // else {
    //   const node = filterKeys(props, nodeModel)
    //   console.log(node)
    //   //update
    //   if (node.id < this.data.nodes.length) {
    //     const index = this.data.nodes.map(edge => edge.id).indexOf(node.id)

    //     this.data.nodes = [
    //       ...this.data.nodes.slice(0, index),
    //       node,
    //       ...this.data.nodes.slice(index + 1),
    //     ]
    //     this.metaData.nodes = [
    //       ...this.metaData.nodes.slice(0, index),
    //       node,
    //       ...this.metaData.nodes.slice(index + 1),
    //     ]
    //   } else 
    //     this.data.nodes.push(node)
    // }
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