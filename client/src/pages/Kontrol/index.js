import React, { Component } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
// import Neo4j from 'components/intermediate/Neo4j'
import EditNode from './EditNode'
import myDate from 'libs/utils/myDate'


class Kontrol extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeAId: -1,
      nodeBId: -1,
      commited: 0,
      told: 0,
      published: 0,
    }
  }

  connectNodes = () => {
    const { nodeAId, nodeBId } = this.state

    if (nodeAId === -1 || nodeBId === -1)
      return

    this.context.store.push({
      
    })
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
            onChange={value => this.setState({nodeA: value})} //TODO
          />
          <EditNode
            node={this.state.nodeB}
            onChange={value => this.setState({nodeB: value})} //TODO
          />
        </div>
      </div>
    )
  }
}

Kontrol.contextType = StoreContext

export default Kontrol
