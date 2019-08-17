import React, { Component, Fragment } from 'react'

import About from 'pages/About'
import Dropdown from 'components/Form/Dropdown'

import { registerListeners, unregisterListeners } from 'libs/utils/preventMobileScrolling'

import User from 'components/interface/User'
import MobileExpander from 'components/interface/MobileExpander'


export default class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
      deviceWidth: 0,
      showAbout: false,
    }
    this.interfaceRef = new React.createRef()
  }

  updateDeviceWidth = () => this.setState({deviceWidth: window.innerWidth})

  componentDidMount() {
    // registerListeners(this.interfaceRef.current)

    window.addEventListener('resize', this.updateDeviceWidth.bind(this))
    window.addEventListener('orientationchange', this.updateDeviceWidth.bind(this))
    this.updateDeviceWidth()
  }
  componentWillUnmount() {
    // unregisterListeners(this.interfaceRef.current)

    window.removeEventListener('resize', this.updateDeviceWidth.bind(this))
    window.removeEventListener('orientationchange', this.updateDeviceWidth.bind(this))
  }

  setNode = nodeName => {
    if (nodeName.length > 0)
      this.updateOptions(nodeName)
    const node = this.props.data.store.get({name: nodeName})

    if (node === null)
      this.props.setNode()
    else
      this.props.setNode(node.id)
  }

  updateOptions = value => {
    if (typeof value === "undefined" || value.length === 0)
      this.setState({currentOptions: []})
    else {
      const options = this.props.data.store.search({name: value, userName: value})
        .slice(0, 5)
        // .map(option => option.name + (option.userName ? ` (@${option.userName})` : ""))
        .map(option => ({
          value: option.name,
          // render: option.name + (option.userName ? ` (@${option.userName})` : "")
          render: <p>{option.name} <em>{option.userName ? ` (@${option.userName})` : ""}</em></p>
        }))
      this.setState({currentOptions: options})
    }
  }

  render = () => {
    const { node } = this.props
    return (
      <div
        ref={this.interfaceRef}
        className={"text-interface " + (this.state.deviceWidth > 1024 && "flex-container")}
      >
        <div className="text-interface__search-bar">
          <Dropdown
            input
            value={(this.props.nodeToShow && this.props.nodeToShow.name) || ""}
            options={this.state.currentOptions}
            updateOptions={value => this.updateOptions(value)}
            onChange={value => this.setNode(value)}
            placeholder="Search..."
            showReset
          />
        </div>
        {this.state.deviceWidth <= 1024 ?
          <MobileExpander>
            <div className="flex-container">
              <div className="flex-column">
                {this.state.showAbout ?
                  <About />
                  :
                  <User node={node} />}
              </div>
              <div className="footer">
                <p
                  className="link"
                  onClick={() => this.setState({showAbout: !this.state.showAbout})}
                >
                  {this.state.showAbout ? "Back" : "About"}
                </p>
              </div>
            </div>
          </MobileExpander>
          :
          <Fragment>
            <div className="flex-column">
              {this.state.showAbout ?
                <About />
                :
                <User node={node} />}
            </div>
            <div className="footer">
              <p
                className="link"
                onClick={() => this.setState({showAbout: !this.state.showAbout})}
              >
                {this.state.showAbout ? "Back" : "About"}
              </p>
            </div>
          </Fragment>
        }
      </div>
    )
  }
}