import React, { Component, Fragment } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

import TextInterface from 'components/interface/TextInterface'
import Loader from 'components/Loader'

import iOS from 'libs/utils/iOS'

import HeatMap from 'components/interface/HeatMap'
import ControlsHelp from 'components/interface/ControlsHelp'

import PoweredByNGINX from 'components/easterEgg/PoweredByNGINX'


class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      retrievedData: undefined,
      nodeToShow: undefined,
      storeConnected: false, //mounts TextInterface only after initial node os determined via URLs
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

        this.setState({storeConnected: true})

        window.onpopstate = this.handleBrowserHistoryButtons.bind(this)
        window.onpushstate = this.handleBrowserHistoryButtons.bind(this)    
      })

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

    if (this.context.threeSceneRef.current)
      this.context.threeSceneRef.current.setCamera(
        node.pos,
        transition
      )
  }

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

    // return (
    //   <Loader
    //     text={
    //       <Fragment>
    //       <p>
    //         Этот сайт исследует человеческие взаимоотношения и не пропагандирует ничего незаконного.<br />
    //       </p>
    //       <p>
    //         В связи с далекой от Истины статьей 78 канала о смерти Кристины Кукушкиной, об этом сайте создалось некорректное впечатление и сюда заходит много людей.<br />
    //       </p>
    //       <p>
    //         Кристина не является девушкой Льва Васильева. Лев Васильев не желает никому смерти на этом сайте и не будет нагонять сюда трафик засчет смерти своей подруги.<br />
    //       </p>
    //       <p>
    //         Пожалуйста, приходите в другой раз. Относитесь скептически к новостным ресурсам. Особенно к 78 каналу.
    //       </p>
    //       </Fragment>
    //     }
    //   />
    // )

    return this.state.storeConnected ? (
      <div className="page-container">
        <TextInterface
          ref={this.context.textInterfaceRef}
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
        <div className="viewer-container" >
          <ThreeScene
            ref={this.context.threeSceneRef}
            myScene={myScene}
            {...props}
          />
          <HeatMap />
          <ControlsHelp />
          <PoweredByNGINX />
        </div>
      </div>
    ) : <Loader />
  }
}

Layout.contextType = StoreContext

export default Layout