import React, { Component, Fragment } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
import Neo4j from 'components/intermediate/Neo4j'
import EditNode from './EditNode'
import Checkbox from 'components/Form/Checkbox'
import myDate from 'libs/utils/myDate'
import DatePicker from 'components/Form/DatePicker'
import edgeModel from 'libs/engines/data/store/models/edge'
import { newInstance } from 'libs/engines/data/store/models'
import {
  undefinedToEmptyString,
  emptyStringToUndefined,
} from 'libs/utils/objectUtils'


const dates = ["commited", "told"]//, "published"]

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
      publishedInstantly: true,
      editingEdge: false,

      recalcInProcess: false,
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

    let edge = this.state
    if (typeof this.state.id === "undefined")
      edge.published = Math.round((new myDate()).getTime() / 1000)

    if (this.state.publishedInstantly)
      edge.told = edge.published

    await this.context.store.push(emptyStringToUndefined(edge))
    this.context.store.copyData()
  }
  deleteEdge = async () => {
    const { node0, node1 } = this.state

    if (node0 === -1 || node1 === -1)
      return

    let edge = this.state
    await this.context.store.delete(emptyStringToUndefined(edge))
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

      if (node0.mates.length > 0 && node1.mates.length > 0) {
        const mateIndex = node0.mates.map(mate => mate.id).indexOf(node1.id)
      
        if (mateIndex !== -1) {
          edge = this.context.store.get({edgeId: node0.mates[mateIndex].edgeId})
          this.setState({editingEdge: true})
        }
      } else {
        edge = this.createEmptyEdge(node0.id, node1.id)
        this.setState({editingEdge: false})
      }

      edge = {
        ...this.createEmptyEdge(node0.id, node1.id),
        ...edge
      }

      Object.keys(undefinedToEmptyString(edge))
        .forEach(key => this.setState({[key]: edge[key]}))
    }
  }

  toggleCalc = () => {
    let tmp = this.context.threeSceneRef?.current?.toggleUnits()
    this.setState({recalcInProcess: !this.state.recalcInProcess})
  }

  pauseCalc = () => {
    let tmp = this.context.threeSceneRef?.current?.units?.graphCalc.pause()
  }
  saveCalc = async () => {
    this.pauseCalc()
    let tmp = await this.context.threeSceneRef?.current?.units?.graphCalc.save()
    await this.context.store.update()
    this.toggleCalc()
  }

  render() {
    return (
      <div className="kontrol">
        <Neo4j />
        <button
          className="button"
          onClick={() => this.toggleCalc()}
        >
          {this.state.recalcInProcess ? "cancel" : "recalc"}
        </button>
        {this.state.recalcInProcess && (
          <Fragment>
            <button
              className="button"
              onClick={() => this.pauseCalc()}
            >
              {this.state.recalcInProcess ? "pause" : "play"}
            </button>
            <button
              className="button"
              onClick={() => this.saveCalc()}
            >
              save
            </button>
          </Fragment>
        )}
        {this.state.node0 && this.state.node1 &&
          <div className="date-pickers">
            {
              (this.state.publishedInstantly ? ["commited"] : dates)
                .map(date =>
                  <DatePicker
                    value={this.state[date]}
                    onChange={value => this.setState({[date]: value})}
                    label={date}
                  />
                )
            }

            <Checkbox
              className="edit-node__checkbox"
              value={this.state.hidden}
              onChange={value => this.setState({hidden: value})}
            >
              hidden
            </Checkbox>
            <Checkbox
              className="edit-node__checkbox"
              value={this.state.publishedInstantly}
              onChange={value => this.setState({publishedInstantly: value})}
            >
              publishedInstantly
            </Checkbox>

            <button
              className="date-pickers__button"
              onClick={() => this.pushEdge()}
            >
              {this.state.editingEdge ? "Update" : "Connect"}
            </button>
            {this.state.editingEdge &&
              <button
                className="date-pickers__button"
                onClick={() => this.deleteEdge()}
              >
                Delete
              </button>
            }
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
