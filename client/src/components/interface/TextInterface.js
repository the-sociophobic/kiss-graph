import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import About from 'pages/About'
import Kontrol from 'pages/Kontrol'
import Dropdown from 'components/Form/Dropdown'

import { registerListeners, unregisterListeners } from 'libs/utils/preventMobileScrolling'
import colorFromWeight from 'libs/utils/colorFromWeight'

import User from 'components/interface/User'
import MobileExpander from 'components/interface/MobileExpander'
import Menu from 'components/interface/Menu'


class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
      deviceWidth: 0,
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
    const isAboutPage = this.props.location.pathname === "/about"

    const footer = (
      <div className="footer">
        {!isAboutPage &&
          <p
            className="link"
            onClick={() => {
              this.props.history.push("/about")
              document.title = "Kiss Graph: About"
            }}
          >
            about
          </p>
        }
      </div>
    )

    const nodeElem = (
      <User
        node={node}
        setNode={this.setNode.bind(this)}
      />)

    let content
    
    console.log(node)

    if (isAboutPage) {
      content = <About />
      document.title = "Kiss Graph: About"
    }
    else if (node && this.props.location.pathname.includes("/node/"))
      content = nodeElem
    else if (this.props.location.pathname === "/kontrol")
      content = <Kontrol />
    else
      content = <Menu setNode={this.setNode.bind(this)} />
      

    const contentWithFooter = (
      <Fragment>
        <div className="flex-column position-relative">
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
              <div className="flex-container position-relative">
                {contentWithFooter}
              </div>
            </MobileExpander>
            :
            <div className="flex-column position-relative">
              <div className="abs-container">
                <div className="flex-container">
                  {contentWithFooter}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(TextInterface)