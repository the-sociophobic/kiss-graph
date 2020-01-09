import React, { Component } from 'react'

import _ from 'lodash'

import StoreContext from 'libs/engines/data/store/StoreContext'
// import Neo4j from 'components/intermediate/Neo4j'
import EditNode from './EditNode'
import myDate from 'libs/utils/myDate'
import Input from 'components/Form/Input'
import { editableFields as edgeEditableFields } from './models/edge'

const dates = ["commited", "told", "published"]
class Kontrol extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node0: undefined,
      node1: undefined,
      ...dates.map(date => ([
        {[date]: undefined}, //UNIX Timestamp
        {[date + "Input"]: 0},
        {[date + "Class"]: 0},
      ]))
      .reduce((a, b) => ({...a, ...b})),
      hidden: false,
    }
  }

  componentDidMount = () =>
    this.context.textInterfaceRef.current &&
    this.context.textInterfaceRef.current.openWorkspace &&
    this.context.textInterfaceRef.current.openWorkspace()

  pushEdge = () => {
    const { node0, node1 } = this.state

    if (node0 === -1 || node1 === -1)
      return

    this.context.store.push(this.state)
    this.context.store.copyData()
  }

  createEmptyEdge = (node0, node1) => ({
    ...edgeEditableFields,
    id: this.context.store.get().edges.length,
    node0: node0,
    node1: node1,
  })

  checkDate = date => {
    if (typeof this.state[date + "Input"] !== "undefined" &&
      this.state[date + "Input"].length > 0)
    {
      const dateClass = new myDate(this.state[date + "Input"])
      this.setState({
        [date + "Class"]: dateClass,
        [date]: dateClass.getTime() / 1000
      })
    }
    else
      this.setState({
        [date + "Class"]: undefined,
        [date]: undefined,
      })
  }

  onEnterPress = (e, date) => e.keyCode === 13 && this.checkDate(date)

  setNodeId = (nodeId, nodeNameInState) => {
    this.setState({[nodeNameInState]: nodeId})

    let nodes = {
      node0: this.context.store.get({id: this.state.node0}),
      node1: this.context.store.get({id: this.state.node1}),
    }
    //state is not updated yet
    nodes[nodeNameInState] = this.context.store.get({id: nodeId})
    const { node0, node1 } = nodes
    console.log(nodes)
    //try find edge
    if (
        node0 !== null && node1 !== null &&
        typeof node0.mates !== "undefined" && typeof node1.mates !== "undefined"
      ) {
      const mateIndex = node0.mates.map(mate => mate.id).indexOf(node1.id)
      let edge
      
      if (mateIndex !== -1)
        edge = this.context.store.get({edgeId: node0.mates[mateIndex].edgeId}) || {}

      edge = _.merge(edge, this.createEmptyEdge(this.state.node0, this.state.node1))
      console.log(edge)
      Object.keys(edge).forEach(key => this.setState({[key]: edge[key]}))
    }
  }

  render() {
    return (
      <div className="kontrol">
        {this.state.node0 && this.state.node1 &&
          <div className="date-pickers">
            {dates.map(date => (
              <div className="date-pickers__row">
                <div className="date-pickers__input-container">
                  <Input
                    value={this.state[date + "Input"]}
                    label={date}
                    onChange={value => this.setState({[date + "Input"]: value})}
                    onBlur={() => this.checkDate(date)}
                    onKeyDown={e => this.onEnterPress(e, date)}
                    className="date-pickers__input"
                  />
                </div>
                <div className="date-pickers__res-container">
                  {typeof this.state[date + "Class"] === "object" ? this.state[date + "Class"].dateTime() : this.state[date + "Class"]}
                </div>
              </div>
            ))}
            <button
              className="date-pickers__button"
              onClick={() => this.pushEdge()}
            >
              Connect
            </button>
          </div>
        }
        <div className="">
          <EditNode
            node={this.state.nodeA}
            setNodeId={nodeId => this.setNodeId(nodeId, "node0")}
          />
          <EditNode
            node={this.state.nodeB}
            setNodeId={nodeId => this.setNodeId(nodeId, "node1")}
          />
        </div>
      </div>
    )
  }
}

Kontrol.contextType = StoreContext

export default Kontrol
