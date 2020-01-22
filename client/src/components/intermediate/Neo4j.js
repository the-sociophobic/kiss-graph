import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import nodeModel from 'libs/engines/data/hardcoded/DB/models/node'
import edgeModel from 'libs/engines/data/hardcoded/DB/models/edge'
import {
  encode,
  encodeMany,
  decodeMany
} from 'libs/engines/data/hardcoded/DB/models'

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
    // .then(res => console.log(res))

  addCurrentData = async () => {
    await this.post([{statement: "MATCH (n) DETACH DELETE n"}])

    const data = this.context.store.get()

    const nodeString = "UNWIND " + encodeMany(nodeModel, data.nodes) +
      " AS properties\nCREATE (n:Person)\nSET n = properties\nRETURN n"
    await this.post([{statement: nodeString}])
    // return
    const edges = data.edges
    const edgeString = edges.map(edge => `
        MATCH (a:Person)
        WHERE a.name = '${this.context.store.get({id: edge.node0}).name}'
        MATCH (b:Person)
        WHERE b.name = '${this.context.store.get({id: edge.node1}).name}'
        CREATE (a)-[r:KISS ${JSON.stringify(encode(edgeModel, edge)).replace(/(?<!\\)\"([^(\")"]+)(?<!\\)\":/g,"$1:")}]->(b)
      `)
      .map(statement => ({statement: statement}))
    console.log(edgeString)
    await this.post(edgeString)
    console.log("edges added")
  }

  getAllData = async () => {
    // const nodes = (await this.post([{statement: "MATCH (node:Person) RETURN node"}]))
    // console.log(decodeMany(nodeModel, nodes))
    const edges = (await this.post([{statement: "MATCH (a:Person)-[edge:KISS]->(b:Person) RETURN edge, a, b"}]))
    console.log(decodeMany(edgeModel, edges))
  }
  
  render() {
    return(
      <div>
        <button
          className="button"
          onClick={() => this.addCurrentData()}
        >
          Добавить
        </button>
        <br />
        <button
          className="button"
          onClick={() => this.getAllData()}
        >
          JSON
        </button>
      </div>
    )
  }
}

Neo4j.contextType = StoreContext

export default  Neo4j