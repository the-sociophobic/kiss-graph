import React, { Component } from 'react'

import parser from 'libs/engines/data/hardcoded/dagitty.net'
import metaParser from 'libs/engines/data/hardcoded/meta'
import data from 'libs/engines/data/hardcoded/dagitty.net/data.30.06.19'
import data_prev from 'libs/engines/data/hardcoded/dagitty.net/data.03.06.19'

export default class Parser extends Component {
  constructor(props) {
    super(props)
    this.copytextRef = React.createRef()
  }

  render() {
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