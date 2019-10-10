import React, { Component } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

import TextInterface from 'components/interface/TextInterface'

import iOS from 'libs/utils/iOS'
import { nameToPath, pathToName } from 'libs/utils/stringTransforms'

import HeatMap from 'components/interface/HeatMap'
import ControlsHelp from 'components/interface/ControlsHelp'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      retrievedData: undefined,
      nodeToShow: undefined,
    }
    this.threeSceneRef = new React.createRef()
  }

  componentDidMount() {
    if (iOS())
      window.scrollTo(0, 0)
    
    const nodeId = this.props.match.params[0]
    if (nodeId) {
      let node = this.context.store.get({name: pathToName(nodeId)})
      if (node === null)
        node = this.context.store.get({userName: nodeId})
      if (node !== null)
        this.setNode(node.id, false)
    }
  }

  setNode = (id, transition = true) => {
    const { history } = this.props

    if (typeof id === "undefined" || id === -1 || (id.length && id.length === 0)) {
      this.setState({nodeToShow: undefined})
      history.push("/node/")
      return
    }

    const node = this.context.store.get({id: id})

    if (typeof node === 'undefined')
      return

    this.setState({nodeToShow: node})
    const nodeId = this.props.match.params.nodeId || ""

    if (nodeId !== nameToPath(node.name) &&
        nodeId !== node.userName)
      history.push("/node/" + nameToPath(node.userName || node.name))
    document.title = "Граф Транзитивных Поцелуев: " + node.name

    if (this.threeSceneRef.current)
      this.threeSceneRef.current.setCamera(
        node.cameraPosition,
        node.cameraTarget,
        transition
      )
  }

  static contextType = StoreContext

  render = () => {
    const props = {
      data: this.context,
      sendData: data => this.setState({retrievedData: data}),
      node: this.state.nodeToShow,
      setNode: this.setNode.bind(this),
      nodeToShow: this.state.nodeToShow,
      history: this.props.history,
      prevLocation: this.props.location && this.props.location.state && this.props.location.state.from,
    }

    return (
      <div className="page-container">
        <TextInterface
          {...props}
        >
          {this.state.retrievedData &&
            <div className="interface-container">
              <div className="interface">
                {this.props.children}
                <textarea
                  value={this.state.retrievedData}
                  rows={40}
                  cols={20}
                />
              </div>
            </div>
          }
        </TextInterface>
        <div className="viewer-container" >
          <ThreeScene
            ref={this.threeSceneRef}
            myScene={myScene}
            {...props}
          />
          <HeatMap />
          <ControlsHelp />
        </div>
      </div>
    )
  }
}

export default Layout