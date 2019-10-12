import parser from 'libs/engines/data/hardcoded/dagitty.net'
import metaParser from 'libs/engines/data/hardcoded/meta'
import data from 'libs/engines/data/hardcoded/dagitty.net/data.12.10.19'
import data_prev from 'libs/engines/data/hardcoded/dagitty.net/data.03.06.19'

//TODO
// class node {
//   constructor(props) {
//     this.props = props
//   }
//   edges = () => {}
// }

const filterSingleNodes = (nodes, edges) => nodes
.filter(node => edges
  .map(edge => (edge.node0 === node.nickName || edge.node1 === node.nickName))
  .reduce((a, b) => a || b)
)

class store {
  constructor(props) {
    this.props = props
    this.data = parser(data)
    this.data.nodes = filterSingleNodes(this.data.nodes, this.data.edges)
    this.metaData = metaParser(this.data)
    this.data_prev = parser(data_prev)
    this.data_prev.nodes = filterSingleNodes(this.data_prev.nodes, this.data_prev.edges)
    this.metaData_prev = metaParser(this.data_prev)

    this.weightSet = Array.from(
      new Set(
        this.metaData.nodes.map(node => node.connections)))
    .sort((a, b) => a - b)
    this.maxWeight = this.weightSet[0]
  }

  get = props => {
    if (typeof props === "undefined")
      // return {
      //   nodes: this.metaData.nodes,
      //   edges: this.metaData.edges,
      // }
    //RETURN META INFO
    return {
      nodesTotalLength: this.metaData.nodes.length,
      edgesTotalLength: this.metaData.edges.length,
      weightSet: this.weightSet,
      maxWeigth: this.maxWeight,
      nodes: this.metaData.nodes,
      edges: this.metaData.edges,
    }

    const { id, name, userName, version } = props

    let data = {}, metaData = {}
    if (typeof version === "undefined") {
      data = this.data
      metaData = this.metaData
    } else {
      data = this.data_prev
      metaData = this.metaData_prev
    }

    if (typeof id === "undefined" && typeof name === "undefined" && typeof userName === "undefined")
      return data

    let nodeInfo = {}
    let nodes = []
    let edges = []

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
        .map(node => node.name.toLowerCase())
        .indexOf(name.toLowerCase())
      if (index !== -1)
        return metaData.nodes[index]
      return null
    }

    if (typeof nodeInfo.name !== "undefined")
      data.edges.forEach(edge => {
        if (edge.node0 === name) {
          edges.push(edge)
          nodes.push(edge.node1)
        }
        if (edge.node1 === name) {
          edges.push(edge)
          nodes.push(edge.node0)
        }
      })

    return ({
      nodeInfo: nodeInfo,
      nodes: nodes,
      edges: edges,
    })
  }

  search = props => {
    let filteredNodes = this.metaData.nodes.filter(node =>
      Object.keys(props).map(key =>
        node[key] && node[key]
          .toLowerCase()
          .split(/_| |-|\./gm)
          .map(word => word.startsWith(props[key].toLowerCase()))
          .reduce((a, b) => a || b)
      )
      .reduce((a, b) => a || b)
    )

    if (filteredNodes.length < 5) {
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
        ...badlyFilteredNodes.slice(0, 5 - filteredNodes.length)
      ]
    }

    return filteredNodes
  }
}

export default store