import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import nodeModel from 'libs/engines/data/store/models/person'
import edgeModel from 'libs/engines/data/store/models/edge'
import {
  encode,
  encodeMany,
  encodeJSONstring,
  decodeMany,
} from 'libs/engines/data/store/models'
import copyToClipboard from 'libs/utils/copyToClipboard'

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
    console.log(edges)
    const edgeString = edges
      .map(edge => {
        console.log(edge)

        return (`
        MATCH (node0:Person)
        WHERE node0.name = '${this.context.store.get({id: edge.node0}).name}'
        MATCH (node1:Person)
        WHERE node1.name = '${this.context.store.get({id: edge.node1}).name}'
        CREATE (node0)-[edge:KISS ${encodeJSONstring(encode(edgeModel, edge))}]->(node1)
      `)})
      .map(statement => ({statement: statement}))
    // console.log(edgeString)
    await this.post(edgeString)
    console.log("edges added")
  }

  copyToJSON = () => this.context.store.copyData()

  getAllData = async () => {
    // const nodes = await this.post([{
    //   statement: `
    //     MATCH (node:Person)
    //     MATCH (node)-[edge:KISS]-(mate:Person)
    //     MATCH (mate)-[mateEdges:KISS]-(mateConnections:Person)
    //     WITH {
    //       date: edge.commited,
    //       edgeId: id(edge),
    //       id: id(mate),
    //       connections: count(mateConnections) + COALESCE(mate.hiddenConnections, 0),
    //       userName: mate.userName,
    //       name: mate.name,
    //       iq: mate.iq,
    //       mentalDisorder: mate.mentalDisorder
    //     } as mates, node as node
    //     WITH node {
    //       .*,
    //       id: id(node),
    //       mates: collect(mates)
    //     } AS node
    //     RETURN node
    //   `
    // }])
    // const decodedNodes = decodeMany(nodeModel, nodes)
    // const edges = await this.post([{
    //   statement: `
    //     MATCH (node0:Person)-[edge:KISS]->(node1:Person)
    //     WITH edge {
    //       .*,
    //       id: id(edge),
    //       node0: id(node0),
    //       node1: id(node1)
    //     } AS edge
    //     RETURN edge
    //   `
    // }])
    // const decodedEdges = decodeMany(edgeModel, edges)
    this.context.store.copyData()
  }
  
  render() {
    return(
      <div>
        {/* <button
          className="button"
          onClick={() => this.addCurrentData()}
        >
          Добавить
        </button> */}
        <br />
        {/* <button
          className="button"
          onClick={() => this.addCurrentData()}
        >
          replace...
        </button> */}
        <button
          className="button"
          onClick={() => this.context.store.copyData()}
        >
          copy to JSON
        </button>
        <button
          className="button"
          onClick={() => this.context.store.copyPos()}
        >
          copy position
        </button>
        <button
          className="button"
          onClick={() => this.context.store.copyUV()}
        >
          copy uv
        </button>
      </div>
    )
  }
}

Neo4j.contextType = StoreContext

export default  Neo4j