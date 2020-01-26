import React, { Component } from 'react'

import _ from 'lodash'

import StoreContext from 'libs/engines/data/store/StoreContext'
import Neo4j from 'components/intermediate/Neo4j'
import EditNode from './EditNode'
import myDate from 'libs/utils/myDate'
import Input from 'components/Form/Input'
import edgeModel from 'libs/engines/data/store/models/edge'
import { newInstance } from 'libs/engines/data/store/models'


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
      editingEdge: false,
    }
  }

  componentDidMount = () =>
    this.context.textInterfaceRef.current &&
    this.context.textInterfaceRef.current.openWorkspace &&
    this.context.textInterfaceRef.current.openWorkspace()

  pushEdge = async () => {
    const { node0, node1 } = this.state

    if (node0 === -1 || node1 === -1)
      return

    console.log(await this.context.store.push(this.state))
    this.context.store.copyData()
  }

  createEmptyEdge = (node0, node1) => ({
    ...newInstance(edgeModel),
    // id: node0 + "-" + node1,
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

    //try find edge
    if (node0 !== null && node1 !== null) {
      let edge = {}
      console.log(node0)
      console.log(node1)

      if (typeof node0.mates !== "undefined" && typeof node1.mates !== "undefined") {
        const mateIndex = node0.mates.map(mate => mate.id).indexOf(node1.id)
      
        if (mateIndex !== -1)
          edge = this.context.store.get({edgeId: node0.mates[mateIndex].edgeId}) || {}
        console.log(edge)
  
        edge = _.merge(this.createEmptyEdge(node0.id, node1.id), edge)
        this.setState({editingEdge: true})
      } else {
        edge = this.createEmptyEdge(node0.id, node1.id)
        this.setState({editingEdge: false})
      }

      Object.keys(edge).forEach(key => this.setState({[key]: edge[key]}))
    }
  }

  render() {
    return (
      <div className="kontrol">
        <Neo4j />
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
              {this.state.editingEdge ? "Update" : "Connect"}
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
