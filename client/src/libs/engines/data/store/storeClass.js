import transliterate from 'libs/utils/transliterate'

import {
  getNodes,
  getEdges,
  createNode,
  createEdge,
  setNode,
  setEdge,
  deleteNode,
  deleteEdge,
} from 'libs/engines/data/store/Neo4j'

// import { data } from 'libs/engines/data/hardcoded/DB'

import copyToClipboard from 'libs/utils/copyToClipboard'
import listenersClass from 'libs/utils/listenersClass'
import createSortedSet from 'libs/utils/createSortedSet'
import isProduction from 'libs/utils/isProduction'
import { nameToPath } from 'libs/utils/stringTransforms'

import { calcGay } from 'libs/engines/data/hardcoded/meta/namesRecognition'
import edgesTypes from 'libs/engines/data/hardcoded/meta/edgesTypes'

import axios from 'axios'


class store extends listenersClass {
  constructor(props) {
    super(props)
    this.props = props
    // this.data = data //ORIGINAL DATA
    this.metaData = {
      nodes: [],
      edges: [],
    }

    this.init()
  }

  init = async () => {
    await this.getData()
    this.callInitListeners()
  }
  update = async () => {
    await this.getData()
    this.callUpdateListeners()
  }

  getData = async () => {
    if (isProduction()) {
      this.metaData = (await axios.get("https://kiss-graph.com/data/nodes")).data
      this.geometry = {
        position: (await axios.get("https://kiss-graph.com/data/position")).data,
        uv: (await axios.get("https://kiss-graph.com/data/uv")).data,
      }
    } else {
      this.metaData = edgesTypes({ //REDO THIS SHIT
        nodes: await getNodes(), //REDO THIS SHIT
        edges: await getEdges(),
      })
      this.metaData.nodes = calcGay(this.metaData.nodes)
    }

    //CALC SECONDARY DATA
    this.iqSet = createSortedSet(this.metaData.nodes, "iq")
    // this.weightSet = createSortedSet(this.metaData.nodes, "connections")
    //REDO THIS SHIT -- separate styles for heat maps
    this.weightSet = createSortedSet([
      ...this.metaData.nodes,
      ...this.metaData.nodes.map(node => ({...node, connections: node.am})).filter(node => node.connections),
      ...this.metaData.nodes.map(node => ({...node, connections: node.af})).filter(node => node.connections),
    ], "connections")
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
        // node.social.fb ||
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
            .includes(transliterate(props[key]))
            // .split(/_| |-|\./gm)
            // .map(word => word.startsWith(props[key].toLowerCase()))
            // .reduce((a, b) => a || b)
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

  push = async (props, updateAfter = true) => {
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
    if (updateAfter)
      await this.update()

    return await res
  }

  delete = async props => {
    let res
    let isEdge = Object.keys(props).includes("node0")

    if (isEdge)
      res = deleteEdge(props)
    else
      res = deleteNode(props)

    await this.update()
    return await res
  }

  copyData = () => copyToClipboard(JSON.stringify({
    nodes: this.metaData.nodes,
    edges: this.metaData.edges,
  }))
  //copy buffer can't handle that size
  copyPos = () => copyToClipboard(JSON.stringify(
    this.geometry.position
  ))
  copyUV = () => copyToClipboard(JSON.stringify(
    this.geometry.uv
  ))

  getGeometry = () => {
    return this.geometry
  }
  setGeometry = geometry => {
    this.geometry = geometry
  }
}

export default store