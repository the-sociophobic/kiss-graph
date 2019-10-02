import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import axios from 'axios'


export default class Parser extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  post = async statements => axios
    .post("http://31.184.252.37:7474/db/data/transaction/commit",
    // .post("http://localhost:7474/db/data/transaction/commit",
      {statements: statements},
      {auth: {
        username: process.env.REACT_APP_DB_LOGIN,
        password: process.env.REACT_APP_DB_PASSWORD,
        // password: "dermo123"
      }}
    )

  addCurrentData = async () => {
    await this.post([{statement: "MATCH (n); DETACH DELETE n"}])

    const data = this.context.store.get()

    const nodes = data.nodes.map(node => ({
      name: node.name,
      userName: node.userName,
      mentalDisorder: node.mentalDisorder,
      iq: node.iq,
      avatar: node.avatar,
      offended: node.offended,
      deceased: node.deceased,
      // TODO pos as p3d
    }))
    const nodeString = "UNWIND " + JSON.stringify(nodes).replace(/\"([^(\")"]+)\":/g,"$1:") +
      " AS properties\nCREATE (n:Person)\nSET n = properties\nRETURN n"
    await this.post([{statement: nodeString}])
    // console.log(nodeString)
    console.log("nodes added")

    const edges = data.edges
    const edgeString = edges.map(edge => `
      MATCH (a:Person)
      WHERE a.name = '${edge.node0}'
      MATCH (b:Person)
      WHERE b.name = '${edge.node1}'
      CREATE (a)-[r:KISS]->(b)
    `)
      .map(statement => ({statement: statement}))
    await this.post(edgeString)
    console.log("edges added")
  }
  
  static contextType = StoreContext

  render() {
    return(
      <div>
        <button onClick={() => this.addCurrentData()}>
          Добавить
        </button>
      </div>
    )
  }
}