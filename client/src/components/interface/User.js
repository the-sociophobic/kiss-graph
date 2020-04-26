import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import Emoji, { EmojiByName } from 'components/Emoji'
import ExternalLink from 'components/ExternalLink'
import { parseLinks } from 'libs/utils/social'
import isProduction from '../../libs/utils/isProduction'


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderSocialLinks = node =>
    node.social &&
    parseLinks(node.social)
      .map(link => link.length > 0 && (
        <ExternalLink
          key={link}
          to={"https://" + link}
          newTab
          className="secret__link"
        >
          random link
        </ExternalLink>)
      )

  renderProps = node => {
    const propsMap = [
      {
        name: "emoji",
        onClick: () => {},
        className: "node-info__tags__item--emoji",
        // style: {background: `linear-gradient(var(--button-color) 50%, var(--weight-color-${node.connections}) 100%)`},
        style: {backgroundColor: `var(--weight-color-${node.connections})`},
        render: node =>
          <EmojiByName name={node.emoji} />
      },
      {
        name: "mentalDisorder",
        link: "mental",
        text: "/10 mental disorder"
      },
      {
        name: "iq",
        render: () => //REDO THIS SHIT: IQ SHOULD BE COUNTED FROM 1, 2 ON BACKEND
        <>
          <Emoji.IQ /> {typeof node.iq === "string" ?
            node.iq :
            (node.iq + (node.iq2 || node.iq)) >> 1} IQ
        </>
      },
      {
        name: "dead",
      },
      {
        name: "offended",
        link: "triggered",
        emoji: "triggered",
        text: " triggered"
      },
      {
        name: "gay",
        text: "% gay"
      },
      {
        name: "sposes",
        onClick: () => {},
        render: () =>
          <>
            <Emoji.married /> {node.sposes.length}:
          </>
      },
      {
        name: "debated",
        onClick: () => {},
        render: () =>
          <>
            <Emoji.womanBan /> {node.debated.length}:
          </>
      },
      {
        name: "mates",
        link: "kisses",
        render: () =>
          <>
            <Emoji.kiss /> {node.connections}
            {node.hiddenConnections ? <> ({node.hiddenConnections}<Emoji.hidden />)</> : ""}:
          </>
      }
    ]

    return (
      <div className="node-info__tags">
      {propsMap.map(prop =>
        typeof node[prop.name] !== "undefined" &&
          <button
            key={prop.name}
            className={"node-info__tags__item " + prop.className}
            style={prop.style}
            onClick={prop.onClick ?
              prop.onClick :
              () => {
                this.props.setNode(null, false, false)
                this.props.history.push("/stats/" + (prop.link || prop.name))
              }}
          >
            {prop.render ? prop.render(node) :
              <>
                <EmojiByName name={prop.emoji || prop.name} />
                {node[prop.name]}
                {prop.text || prop.name}
              </>
            }
          </button>
        )
      }
      </div>
    )
  }

  renderConnections = (node, arrayName) =>
    node[arrayName].length > 0 && (
      <div className="node-info__connections">
        <List items={node[arrayName]
          .sort((a, b) => b.connections - a.connections)
          .map(connection =>
            [<UserNameLink
              key={connection.userName || connection.name}
              user={connection}
              setNode={this.props.setNode}
              date={connection.date}
            />]
          )}
        />
      </div>
    )
          
  render = () => {
    const { node } = this.props

    if (typeof node === "undefined")
      return <></>

    let nodeProps = {
      emoji: "person",
      ...node,
    }
    // if (node.sposes.length > 0)
      nodeProps = {
        ...nodeProps,
        sposes: undefined,
        debated: undefined,
        mates: undefined,
      }
    // else if (node.debated.length > 0)
    //   nodeProps = {
    //     ...nodeProps,
    //     sposes: undefined,
    //     mates: undefined,
    //   }
    // else
    //   nodeProps = {
    //     ...nodeProps,
    //     sposes: undefined,
    //     debated: undefined,
    //   }
  
    return (
      <div className="node-info">
        {/* {node.emoji &&
          <div className="node-info__emoji">
            <EmojiByName name={node.emoji} />
          </div>
        } */}
        {!isProduction() &&
          <div className="secret">
            {this.renderSocialLinks(node)}
          </div>}
        
        {this.renderProps(nodeProps)}

        {node.sposes.length > 0 &&
          this.renderProps({sposes: node.sposes})}
        {this.renderConnections(node, "sposes")}

        {node.debated.length > 0 &&
          this.renderProps({debated: node.debated})}
        {this.renderConnections(node, "debated")}

        {node.connections > 0 &&
          this.renderProps({
            mates: node.mates,
            connections: node.connections,
            hiddenConnections: node.hiddenConnections
          })}
        {this.renderConnections(node, "mates")}

      </div>
    )
  }
}

User.contextType = StoreContext

export default withRouter(User)