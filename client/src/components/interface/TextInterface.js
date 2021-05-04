import React, { Component, Fragment } from 'react'

import withRouter from 'components/withRouterAndRef'

import About from 'pages/About'
import Kontrol from 'pages/Kontrol'

import { registerListeners, unregisterListeners } from 'libs/utils/preventMobileScrolling'

import User from 'components/interface/User'
import Edge from 'components/interface/Edge'
import MobileExpander from 'components/interface/MobileExpander'
import Menu from 'components/interface/Menu'
// import Feed from 'components/interface/Feed'
import NameSearch from 'components/interface/NameSearch'
import WeightColorsStyle from 'components/interface/WeightColorsStyle'

import StoreContext from 'libs/engines/data/store/StoreContext'


class TextInterface extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentOptions: [],
      deviceWidth: 0,
      desktopSpread: false,
      showFooter: true,
      showSearch: true,
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

  setNode = (input, transition, pushHistory) => { //REDO THIS SHIT: It is used in many places, bugs inevitable...
    if (typeof input === "undefined" || input === null) {
      this.props.setNode(null, transition, pushHistory)
      return
    }

    if (typeof input === "string") {
      let nodeName = input
      const node = this.context.store.get({name: nodeName})

      if (node === null)
        this.props.setNode(null, transition, pushHistory)
      else
        this.props.setNode(node.id, transition, pushHistory)
    } else {
      this.props.setNode(input.id, transition, pushHistory)
    }
  }

  openWorkspace = () => this.setState({
    desktopSpread: true,
    showFooter: false,
    showSearch: false,
  })

  render = () => {
    const { node } = this.props
    const isAboutPage = this.props.location.pathname === "/about"

    const footer = (
      <div className="footer">
        {!isAboutPage ?
          <p
            className="link"
            onClick={() => {
              this.props.history.push("/about")
              document.title = "Kiss Graph: About"
            }}
          >
            about
          </p>
          :
          <p
            className="link"
            onClick={() => {
              //REDO THIS SHIT: write router
              if (this.props.node) {
                this.props.history.push(`/node/${this.props.node.link}`)
                document.title = `Kiss Graph: ${this.props.node.name}`
              }
              else
                this.props.history.push("/news")
            }}
          >
            back
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
    else if (this.props.location.pathname.includes("/edge/"))
      content = <Edge setNode={this.setNode.bind(this)} />
    else if (this.props.location.pathname === "/kontrol")
      content = <Kontrol />
    else
      content = <Menu setNode={this.setNode.bind(this)} />
      // content = <Feed setNode={this.setNode.bind(this)} />
      

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
        {this.state.showFooter && footer}
      </Fragment>
    )

    return (
      <div
        ref={this.interfaceRef}
        className={"text-interface " + (this.state.desktopSpread && "text-interface--spread")}
      >
        <button
          className={"text-interface__spread-button " + (this.state.desktopSpread ? "text-interface__spread-button--opened" : "text-interface__spread-button--closed")}
          onClick={() => this.setState({desktopSpread: !this.state.desktopSpread})}
        />
        <WeightColorsStyle />
        <div className="flex-container">
          {this.state.showSearch &&
            <div
              ref={this.searchBarRef}
              className="text-interface__search-bar"
            >
              <NameSearch
                node={this.props.nodeToShow}
                onChange={value => this.setNode(value)}
              />
            </div>
          }
          
          {this.state.deviceWidth <= 1024 ?
            <MobileExpander
              node={node}
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