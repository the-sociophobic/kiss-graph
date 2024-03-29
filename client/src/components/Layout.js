import React, { Component } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

import TextInterface from 'components/interface/TextInterface'
import Loader from 'components/Loader'
import Login from 'components/Login'

import iOS from 'libs/utils/iOS'

import HeatMap from 'components/interface/HeatMap'
import ControlsHelp from 'components/interface/ControlsHelp'
import ExternalLink from 'components/ExternalLink'
import Emoji from 'components/Emoji'

import PoweredByNGINX from 'components/easterEgg/PoweredByNGINX'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeToShow: undefined,
      edgeToShow: undefined,
      storeConnected: false, //mounts TextInterface only after initial node os determined via URLs
      spritesCreated: false,
    }
  }

  componentDidMount = () =>
    this.context.store
      .addInitListener(() => {

        if (iOS())
          window.scrollTo(0, 0)
      
        if (this.props.location.pathname.includes("/node/")) {
          const nodeLink = this.props.location.pathname.slice("/node/".length)
    
          if (nodeLink) {
            let node = this.context.store.get({link: nodeLink})
            if (node !== null)
              this.setNode(node.id, false, false)
          }
        }

        if (this.props.location.pathname.includes("/edge/")) {
          const edgeLink = this.props.location.pathname.slice("/edge/".length)

          if (edgeLink) {
            let edge = this.context.store.get({ edgeId: edgeLink, bla: 'a' })
            if (edge !== null)
              this.setState({ edgeToShow: edge })
          }
        }

        this.setState({storeConnected: true})

        window.onpopstate = this.handleBrowserHistoryButtons.bind(this)
        window.onpushstate = this.handleBrowserHistoryButtons.bind(this)    
      })

  handleBrowserHistoryButtons = e => {
    if (this.props.location.pathname.includes("/node/")) {
      const nodeLink = this.props.location.pathname.slice("/node/".length)
      const node = this.context.store.search({link: nodeLink})[0]
  
      this.setNode(node.id, true, false)
    } else {
      this.setNode(undefined, false, false)
    }
    //TODO ???
  }

  setNode = (id, transition = true, pushHistory = true) => {
    const { history } = this.props

    if (typeof id === "undefined" || id === -1 || id === null || (id.length && id.length === 0)) {
      this.setState({nodeToShow: undefined})
      if (pushHistory) {
        history.push(`/news/published`)
        document.title = "Kiss Graph: News / published"
      }
      return
    }

    const node = this.context.store.get({id: id})

    if (typeof node === 'undefined' || node === null)
      return

    this.setState({nodeToShow: node})
    const currentNodeId = this.props.location.pathname.slice("/node/".length) || ""

    if (currentNodeId !== node.link && pushHistory)
      history.push(`/node/${node.link}`)
    document.title = "Kiss Graph: " + node.name

    if (this.context.threeSceneRef.current)
      this.context.threeSceneRef.current.setCamera(
        node.pos,
        transition
      )
  }

  render = () => {
    const props = {
      data: this.context,
      node: this.state.nodeToShow,
      edge: this.state.edgeToShow,
      setNode: this.setNode.bind(this),
      nodeToShow: this.state.nodeToShow,
      history: this.props.history,
      prevLocation: this.props.location && this.props.location.state && this.props.location.state.from,
    }

    return <>
      <Loader>
        <h1 className="h1">Kiss Graph v5.15</h1>
        <h4 className="h4">Updates:</h4>
        <ul className="ul">
          <li className="li">3d Engine optimised</li>
          <li className="li">clickable edges</li>
          <li className="li">EQ</li>
        </ul>
      </Loader>
      {/* <Login /> */}
      {this.state.storeConnected &&
        <div className="page-container">
          <TextInterface
            ref={this.context.textInterfaceRef}
            {...props}
          />
          <div className="viewer-container" >
            <ThreeScene
              ref={this.context.threeSceneRef}
              myScene={myScene}
              {...props}
            />
            <HeatMap node={this.state.nodeToShow} />
            <ControlsHelp />
            <PoweredByNGINX />
          </div>
        </div>
      }
    </>
  }
}

Layout.contextType = StoreContext

export default Layout