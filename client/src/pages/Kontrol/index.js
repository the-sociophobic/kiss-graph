import React, { Component } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
// import Neo4j from 'components/intermediate/Neo4j'
import EditNode from './EditNode'
import myDate from 'libs/utils/myDate'


class Kontrol extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node0: -1,
      node1: -1,
      commited: 0,
      told: 0,
      published: 0,
      hidden: false,
    }
  }

  connectNodes = () => {
    const { node0, node1 } = this.state

    if (node0 === -1 || node1 === -1)
      return

    this.context.store.push(this.state)
  }

  render() {
    const data = this.context.store.get()

    return (
      <div>
        <button
          className="button"
          onClick={() => this.connectNodes()}
        >
          Connect
        </button>
        <div className="">
          <EditNode
            node={this.state.nodeA}
            setNodeId={value => this.setState({node0: value})} //TODO
          />
          <EditNode
            node={this.state.nodeB}
            setNodeId={value => this.setState({node1: value})} //TODO
          />
        </div>
      </div>
    )
  }
}

Kontrol.contextType = StoreContext

export default Kontrol
