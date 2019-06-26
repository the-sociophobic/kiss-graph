import React, { Component } from 'react'
import Block from 'components/interface/Block'

import parser from './parser'
import data from './data'
import data_prev from './data_prev'
import metaParser from './metaParser'

import axios from 'axios'
export default class Parser extends Component {
  constructor(props) {
    super(props)
    this.copytextRef = React.createRef()
  }

  componentDidMount() {
    // this.copytextRef.current.select()
    // document.execCommand("copy")
  }

  render() {
    const nodes = parser(data).nodes.map(node => ({
      nickName: node.nickName,
      firstName: node.firstName,
      lastName: node.lastName,
    }))
    const nodeString = "UNWIND " + JSON.stringify(nodes).replace(/\"([^(\")"]+)\":/g,"$1:") +
      " AS properties\nCREATE (n:Person)\nSET n = properties\nRETURN n"

    const edges = parser(data).edges
    const edgeString = edges.map(edge => `
      MATCH (a:Person)
      WHERE a.nickName = '${edge.node0}'
      MATCH (b:Person)
      WHERE b.nickName = '${edge.node1}'
      CREATE (a)-[r:KISS]->(b)
    `)
      .map(statement => ({statement: statement}))

    // axios.post("http://localhost:7474/db/data/transaction/commit", {statements: edgeString}, {
    //   auth: {
    //     username: "neo4j",
    //     password: "dermo123"
    //   }
    // })
    //   .then(res => console.log("aaa " + res))
    //   .catch(err => console.log("bbb " + err))

    // console.log(metaParser(parser(data)))

    const prevData = metaParser(parser(data_prev)).nodes
    const curData = metaParser(parser(data)).nodes.slice(0, 50)
    const ratingData = curData.map((node, index) => {
      const indexPrev = prevData
        .map(node => node.name)
        .indexOf(node.name)
      
      let arrow = "neutral"
      if (indexPrev === -1 || indexPrev > index)
        arrow = "up"
      if (indexPrev < index)
        arrow = "down"
      return {
        ...node,
        arrow: arrow,
        newConnections: indexPrev === -1 ? node.connections : node.connections - prevData[indexPrev].connections
      }
    })

    const rowsMapped = ratingData.map((node, index) =>(
      <div className={"rating-row " + node.arrow}>
        <div className="rating-row__index">
          {index + 1}
        </div>
        <div className="rating-row__name">
          {node.name}
        </div>
        <div className="rating-row__addition">
          {node.newConnections === 0 ? "" : "(+" + node.newConnections + ")"}
        </div>
        <div className="rating-row__connections">
          {node.connections}
        </div>
      </div>
    ))

    return(
      <div>
        {/* <textarea
          // value={edgeString}
          value={nodeString}
          rows={40}
          cols={40}
          ref={this.copytextRef}
        /> */} 
        <div className="half">
          {rowsMapped.slice(0, 25)}
        </div>
        <div className="half">
          {rowsMapped.slice(25)}
        </div>
      </div>
    )
  }
}