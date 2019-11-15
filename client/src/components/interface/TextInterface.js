import React, { Component, Fragment } from 'react'

import About from 'pages/About'
import Dropdown from 'components/Form/Dropdown'

import { registerListeners, unregisterListeners } from 'libs/utils/preventMobileScrolling'
import colorFromWeight from 'libs/utils/colorFromWeight'

import User from 'components/interface/User'
import MobileExpander from 'components/interface/MobileExpander'
import Menu from 'components/interface/Menu'


export default class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
      deviceWidth: 0,
      showAbout: false,
    }
    this.interfaceRef = new React.createRef()
    this.searchBarRef = new React.createRef()
  }

  updateDeviceWidth = () => this.setState({deviceWidth: window.innerWidth})

  componentDidMount() {
    registerListeners(this.searchBarRef.current)

    window.addEventListener('resize', this.updateDeviceWidth.bind(this))
    window.addEventListener('orientationchange', this.updateDeviceWidth.bind(this))
    this.updateDeviceWidth()
  }
  componentWillUnmount() {
    unregisterListeners(this.searchBarRef.current)

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
        .slice(0, window.innerHeight > 736 ? 7 : 5)
        .map(option => ({
          value: option.name,
          style: {':hover': {
            backgroundColor: colorFromWeight(option.uv, "light"),
          }},
          render: <p className="p">
              {option.name} <em>{option.userName ? ` (@${option.userName})` : ""}</em>
            </p>
        }))
      this.setState({currentOptions: options})
    }
  }

  render = () => {
    const { node } = this.props
    const footer = (
      <div className="footer">
        <p
          className="link"
          onClick={() => this.setState({showAbout: !this.state.showAbout})}
        >
          {this.state.showAbout ? "back" : "about"}
        </p>
      </div>
    )

    const nodeElem = (
      <User
        node={node}
        setNode={this.setNode.bind(this)}
      />)

    const content = this.state.showAbout ?
      <About />
      :
      (node ? nodeElem : <Menu setNode={this.setNode.bind(this)} />)

    const contentWithFooter = (
      <Fragment>
        <div className="flex-column relative">
          <div className="abs-container">
            <div className="scroll-column">
              <div className="flex-container">
                <div className="text-interface__content">
                  {this.props.children}
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
        {footer}
      </Fragment>
    )

    return (
      <div
        ref={this.interfaceRef}
        className="text-interface"
      >
        <div className="flex-container">
          <div
            ref={this.searchBarRef}
            className="text-interface__search-bar"
          >
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
            <MobileExpander
              history={this.props.history}
              prevLocation={this.props.prevLocation}
            >
              <div className="flex-container relative">
                {contentWithFooter}
              </div>
            </MobileExpander>
            :
            <div className="flex-column relative">
              <div className="abs-container">
                <div className="scroll-column">
                  <div className="flex-container">
                    {contentWithFooter}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}
