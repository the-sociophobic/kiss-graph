import React, { Component } from 'react'
import Block from 'components/interface/Block'

import parser from 'libs/engines/data/hardcoded/dagitty.net'
import data from 'libs/engines/data/hardcoded/dagitty.net/data.30.06.19'

import axios from 'axios'
export default class Parser extends Component {
  constructor(props) {
    super(props)
    this.copytextRef = React.createRef()
  }

  componentDidMount() {
    this.copytextRef.current.select()
    document.execCommand("copy")
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

    return(
      <div>
        <Block>
          <textarea
            // value={edgeString}
            value={nodeString}
            rows={40}
            cols={40}
            ref={this.copytextRef}
          />
        </Block>
      </div>
    )
  }
}