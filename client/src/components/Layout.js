import React, { Component } from 'react'

import ThreeScene from './ThreeScene'
import myScene from 'libs/myScene'

import StoreContext from 'libs/engines/data/store/StoreContext'

import axios from 'axios'

import TextInterface from 'components/interface/TextInterface'

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      W: 0,
      H: 0,
      retrievedData: "",
      // camera: {
      //   position: new THREE.Vector3(0, 0, 5),
      //   target: new THREE.Vector3(0, 0, 0),
      // }
      nodeToShow: undefined,
    }
    this.threeSceneRef = new React.createRef()
  }

  updateDimensions = () => this.setState({
    W: window.innerWidth,
    H: window.innerHeight,
  })

  componentDidMount() {
    if (typeof Window.minimize === "function")
      Window.minimize() //will it work ???
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)

    axios.get('http://localhost:1335/node').then(a => console.log(a))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  static contextType = StoreContext

  render = () => {
    const props = {
      W: this.state.W,
      H: this.state.H,
      // cameraData: this.state.camera,
      data: this.context,
      sendData: data => this.setState({retrievedData: data}),
      setNode: id => {
        const node = this.context.store.get({id: id})

        this.setState({nodeToShow: node})
        if (typeof node !== 'undefined' && this.threeSceneRef.current)
          this.threeSceneRef.current.setCamera(node.cameraPosition, node.cameraTarget)
      }
    }
    return (
      <div className="page-container">
        <TextInterface node={this.state.nodeToShow} />
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