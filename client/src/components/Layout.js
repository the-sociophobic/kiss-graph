import React, { Component } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

import TextInterface from 'components/interface/TextInterface'

import iOS from 'libs/utils/iOS'
import { pathToName } from 'libs/utils/stringTransforms'

import HeatMap from 'components/interface/HeatMap'
import ControlsHelp from 'components/interface/ControlsHelp'

import PoweredByNGINX from 'components/easterEgg/PoweredByNGINX'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      retrievedData: undefined,
      nodeToShow: undefined,
      storeConnected: false, //mounts TextInterface only after initial nnode os determined via URLs
    }
    this.threeSceneRef = new React.createRef()
  }

  componentDidMount() {
    if (iOS())
      window.scrollTo(0, 0)
    
    if (this.props.location.pathname.includes("/node/")) {
      const nodeId = this.props.location.pathname.slice("/node/".length)

      if (nodeId) {
        let node = this.context.store.get({name: pathToName(nodeId)})
        if (node === null)
          node = this.context.store.get({userName: nodeId})
        if (node !== null)
          this.setNode(node.id, false, false)
      }
    }

    this.setState({storeConnected: true})
    window.onpopstate = this.handleBrowserHistoryButtons.bind(this)
    window.onpushstate = this.handleBrowserHistoryButtons.bind(this)
  }

  handleBrowserHistoryButtons = e => {
    if (this.props.location.pathname.includes("/node/")) {
      const nodeLink = this.props.location.pathname.slice("/node/".length)
      const node = this.context.store.search({link: nodeLink})[0]
  
      this.setNode(node.id, true, false)  
    }
    //TODO ???
  }

  setNode = (id, transition = true, pushHistory = true) => {
    const { history } = this.props

    if (typeof id === "undefined" || id === -1 || (id.length && id.length === 0)) {
      this.setState({nodeToShow: undefined})
      history.push(`/news/told`)
      document.title = "Kiss Graph: News / told"
      return
    }

    const node = this.context.store.get({id: id})

    if (typeof node === 'undefined')
      return

    this.setState({nodeToShow: node})
    const currentNodeId = this.props.location.pathname.slice("/node/".length) || ""

    if (currentNodeId !== node.link && pushHistory)
      history.push(`/node/${node.link}`)
    document.title = "Kiss Graph: " + node.name

    if (this.threeSceneRef.current)
      this.threeSceneRef.current.setCamera(
        node.pos,
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
        {this.state.storeConnected &&
          <TextInterface
            {...props}
          >
            {this.state.retrievedData &&
              <div className="interface-container">
                <div className="interface">
                  {/* {this.props.children} */}
                  <textarea
                    value={this.state.retrievedData}
                    rows={40}
                    cols={20}
                  />
                </div>
              </div>
            }
          </TextInterface>
        }
        <div className="viewer-container" >
          <ThreeScene
            ref={this.threeSceneRef}
            myScene={myScene}
            {...props}
          />
          <HeatMap />
          <ControlsHelp />
          <PoweredByNGINX />
        </div>
      </div>
    )
  }
}

export default Layout