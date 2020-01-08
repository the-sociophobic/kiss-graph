import React, { Component } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
// import Neo4j from 'components/intermediate/Neo4j'
import EditNode from './EditNode'
import myDate from 'libs/utils/myDate'
import Input from 'components/Form/Input'


const dates = ["commited", "told", "published"]
class Kontrol extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node0: -1,
      node1: -1,
      ...dates.map(date => ([
        {[date]: undefined}, //UNIX Timestamp
        {[date + "Input"]: 0},
        {[date + "Class"]: 0},
      ]))
      .reduce((a, b) => ({...a, ...b})),
      hidden: false,
    }
  }

  connectNodes = () => {
    const { node0, node1 } = this.state

    if (node0 === -1 || node1 === -1)
      return

    this.context.store.push(this.state)
    this.context.store.copyData()
  }

  onEnterPress = (e, date) => {
    if (e.keyCode === 13)
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

  render() {
    return (
      <div>
        <div className="date-pickers">
          {dates.map(date => (
            <div className="date-pickers__row">
              <div className="date-pickers__input-container">
                <Input
                  value={this.state[date + "Input"]}
                  label={date}
                  onChange={value => this.setState({[date + "Input"]: value})}
                  onKeyDown={e => this.onEnterPress(e, date)}
                  className="date-pickers__input"
                />
              </div>
              <div className="date-pickers__res-container">
                res: {typeof this.state[date + "Class"] === "object" ? this.state[date + "Class"].dateTime() : this.state[date + "Class"]}
              </div>
            </div>
          ))}
          <button
            className="date-pickers__button"
            onClick={() => this.connectNodes()}
          >
            Connect
          </button>
        </div>
        <div className="">
          <EditNode
            node={this.state.nodeA}
            setNodeId={value => this.setState({node0: value})} //TODO
          />
          <EditNode
            node={this.state.nodeB}
            setNodeId={value => this.setState({node1: value})} //TODO
          />
        </div>
      </div>
    )
  }
}

Kontrol.contextType = StoreContext

export default Kontrol
