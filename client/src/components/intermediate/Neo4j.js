import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
// import { model as nodeModel } from 'pages/Kontrol/models/node'

import axios from 'axios'


class Neo4j extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  post = async statements => axios
    // .post("http://31.184.252.37:7474/db/data/transaction/commit",
    .post("http://localhost:7474/db/data/transaction/commit",
      {statements: statements},
      {auth: {
        // username: process.env.REACT_APP_DB_LOGIN,
        // password: process.env.REACT_APP_DB_PASSWORD,
        username: "neo4j",
        password: "dermo123"
      }}
    )

  addCurrentData = async () => {
    await this.post([{statement: "MATCH (n) DETACH DELETE n"}])

    const data = this.context.store.get()

    const nodes = data.nodes.map(node => ({
      name: node.name,
      userName: node.userName,
      social: node.social && JSON.stringify(node.social),
      pos: `point({x:${node.pos.x}, y:${node.pos.y}, z:${node.pos.z}})`,
      hiddenConnections: node.hiddenConnections,
      iq: node.iq,
      mentalDisorder: node.mentalDisorder,
      dead: node.dead,
      offended: node.offended,
      //experimental
      SHR: node.SHR && JSON.stringify(node.SHR),
      political: node.political && JSON.stringify(node.political),
      aka: node.aka && JSON.stringify(node.aka),
    }))

    let nodesProps = JSON.stringify(nodes)
      // .replace(/\"([^(\")"]+)\":/g,"$1:") //WHAT IS IT
      // .replace(/"point/g, "point")
      // .replace(/}\)"/g, "})")
      // .replace(/"{/g, "{")
      // .replace(/}"/g, "}")
      // .replace(/"\[/g, "[")
      // .replace(/\]"/g, "]")

    const nodeString = "UNWIND " + nodesProps +
      " AS properties\nCREATE (n:Person)\nSET n = properties\nRETURN n"
    // await this.post([{statement: nodeString}])
    console.log(nodeString)
    // console.log("nodes added")
return
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

  getAllData = async () => {
    const nodes = (await this.post([{statement: "MATCH (node:Person) RETURN node"}])).data//.results.data
    console.log(nodes)
    const edges = (await this.post([{statement: "MATCH -[edge:KISS]-> RETURN edge"}])).data//.results.data
    console.log(edges)
  }
  
  render() {
    return(
      <div>
        <button onClick={() => this.addCurrentData()}>
          Добавить
        </button>
        <br />
        <button onClick={() => this.getAllData()}>
          JSON
        </button>
      </div>
    )
  }
}

Neo4j.contextType = StoreContext

export default  Neo4j