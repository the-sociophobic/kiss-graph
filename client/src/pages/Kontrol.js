import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import Neo4j from 'components/intermediate/Neo4j'

class Kontrol extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static contextType = StoreContext

  render() {
    const data = this.context.store.get()
    console.log(process.env.REACT_APP_DB_LOGIN)
    return (
      <div>
        nodes: {data.nodes.length}<br />
        edges: {data.edges.length}
        <Neo4j />
      </div>
    )
  }
}

export default Kontrol
