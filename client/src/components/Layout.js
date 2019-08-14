import React, { Component } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

import TextInterface from 'components/interface/TextInterface'

import iOS from 'libs/utils/iOS'
import { nameToPath, pathToName } from 'libs/utils/stringTransforms'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      retrievedData: "",
      nodeToShow: undefined,
    }
    this.threeSceneRef = new React.createRef()
  }

  componentDidMount() {
    if (iOS())
      window.scrollTo(0, 0)
    
    const { location } = this.props
    const path = location.pathname.slice(1)
    if (path.length > 0) {
      const node = this.context.store.get({name: pathToName(path)})
      this.setNode(node.id, false)
    }
  }

  setNode = (id, transition = true) => {
    const node = this.context.store.get({id: id})

    if (typeof node === 'undefined')
      return

    this.setState({nodeToShow: node})
    const { history, location } = this.props
    if (location.pathname.slice(1) !== nameToPath(node.name)) {
      history.push(nameToPath(node.name))
      document.title = node.name
    }

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
      setNode: this.setNode.bind(this),
      nodeToShow: this.state.nodeToShow,
    }

    return (
      <div className="page-container">
        <TextInterface
          node={this.state.nodeToShow}
          {...props}
        />
        <div className="viewer-container" >
          <ThreeScene
            ref={this.threeSceneRef}
            myScene={myScene}
            {...props}
          />
        </div>
        {/* <div className="interface-container">
          <div className="interface">
            {this.props.children}
            <textarea
              value={this.state.retrievedData}
              rows={40}
              cols={20}
            />
          </div>
        </div> */}
      </div>
    )
  }
}

export default Layout