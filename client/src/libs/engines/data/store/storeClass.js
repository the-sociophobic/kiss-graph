import _ from 'lodash'

import copyToClipboard from 'libs/utils/copyToClipboard'
// import { model as nodeModel } from 'pages/Kontrol/models/node'
// import { model as edgeModel } from 'pages/Kontrol/models/edge'
import { data, parseConnections } from 'libs/engines/data/hardcoded/DB'


const filterKeys = (item, model) => 
  _.pickBy(item, (value, key) => Object.keys(model).includes(key))

class store {
  constructor(props) {
    this.props = props
    this.data = data
    this.metaData = parseConnections(data)

    const createSortedSet = (objectsArray, property) =>
      Array.from(
        new Set(objectsArray.map(object => object[property]))
      ).sort((a, b) => a - b)

    this.weightSet = createSortedSet(this.metaData.nodes, "connections")
    this.iqSet = createSortedSet(this.metaData.nodes, "iq")
    this.mentalDisorderSet = createSortedSet(this.metaData.nodes, "mentalDisorder")
  }

  get = props => {
    if (typeof props === "undefined")
      return {
        nodesTotalLength: this.metaData.nodes.length,
        edgesTotalLength: this.metaData.edges.length,
        weightSet: this.weightSet,
        maxWeigth: this.maxWeight,
        nodes: this.metaData.nodes,
        edges: this.metaData.edges,
      }

    const { id, name, userName } = props

    let { data, metaData } = this

    if (typeof id === "undefined" && typeof name === "undefined" && typeof userName === "undefined")
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

    if (typeof name !== "undefined") {
      const index = metaData.nodes
        .map(node => node.name)
        .indexOf(name)
      if (index !== -1)
        return metaData.nodes[index]
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
      )
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
      )
      filteredNodes = [
        ...filteredNodes,
        ...badlyFilteredNodes.slice(0, limit - filteredNodes.length)
      ]
    }

    return filteredNodes
  }

  push = props => {
    //push edge
    if (Object.keys(props).includes("node0")) {
      //update
      if (props.id < this.data.edges) {
        const index = this.data.edges.map(edge => edge.id).indexOf(props.id)

        this.data.edges = [
          ...this.data.edges.slice(0, index),
          ...this.data.edges.slice(index),
        ]
      } else
        this.data.edges.push(props)
    }
    //push node
    else {
      if (props.id < this.data.nodes) {
        const index = this.data.nodes.map(edge => edge.id).indexOf(props.id)

        this.data.nodes = [
          ...this.data.nodes.slice(0, index),
          ...this.data.nodes.slice(index),
        ]
      } else
        this.data.nodes.push(props)
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