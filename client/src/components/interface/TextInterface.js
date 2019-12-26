import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import About from 'pages/About'
import Kontrol from 'pages/Kontrol'

import { registerListeners, unregisterListeners } from 'libs/utils/preventMobileScrolling'

import User from 'components/interface/User'
import MobileExpander from 'components/interface/MobileExpander'
import Menu from 'components/interface/Menu'
import NameSearch from 'components/interface/NameSearch'

import StoreContext from 'libs/engines/data/store/StoreContext'


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
    const node = this.context.store.get({name: nodeName})

    if (node === null)
      this.props.setNode()
    else
      this.props.setNode(node.id)
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
            <NameSearch
              nodeToShow={this.props.nodeToShow}
              setNode={value => this.setNode(value)}
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

TextInterface.contextType = StoreContext

export default withRouter(TextInterface)