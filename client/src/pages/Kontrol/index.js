import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import NameSearch from 'components/interface/NameSearch'
// import Neo4j from 'components/intermediate/Neo4j'

import EditNode from './EditNode'
import model from './model'


const createEmptyNode = (name, id) => ({
  ...model,
  id: id,
  name: name,
})

class Kontrol extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeAName: "",
      nodeA: undefined,
      nodeBName: "",
      nodeB: undefined,
    }
  }

  setNode = (nodeName, stateNodeName) => {
    const node = this.context.store.get({name: nodeName})

    if (node === null)
      this.setState({[stateNodeName]: createEmptyNode(nodeName, this.context.store.get().nodes.length)})
    else
      this.setState({[stateNodeName]: node})
  }

  render() {
    const data = this.context.store.get()

    return (
      <div>
        nodes: {data.nodes.length}<br />
        edges: {data.edges.length}
        <NameSearch
          nodeToShow={this.state.nodeA}
          setNode={value => this.setNode(value, "nodeA")}
          onKeyDown={e => e.key === "Enter" && this.setNode(this.state.nodeAName, "nodeA")}
          className="mb-4"
        />
        {this.state.nodeA &&
          <EditNode
            node={this.state.nodeA}
            saveNode={node => {}} //TODO
          />
        }
        <NameSearch
          nodeToShow={this.state.nodeB}
          setNode={value => this.setNode(value, "nodeB")}
          onKeyDown={e => e.key === "Enter" && this.setNode(this.state.nodeBName, "nodeB")}
          className="mb-4"
        />
        {this.state.nodeB &&
          <EditNode
            node={this.state.nodeB}
            saveNode={node => {}} //TODO
          />
        }
        {/* <Neo4j /> */}
      </div>
    )
  }
}

Kontrol.contextType = StoreContext

export default Kontrol
