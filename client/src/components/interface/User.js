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
        name: "connections",
        link: "kisses",
        render: () =>
          <>
            <Emoji.kiss /> {node.connections}
            {node.hiddenConnections ? <> ({node.hiddenConnections}<Emoji.hidden />)</> : ""}:
          </>
      }
    ]

    return propsMap.map(prop =>
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
          
  render = () => {
    const { node } = this.props

    if (typeof node === "undefined")
      return <></>

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
        <div className="node-info__tags">
          {this.renderProps({
            emoji: "person",
            ...node,
          })}
        </div>
        <div className="node-info__connections">
          <List items={node.mates
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
      </div>
    )
  }
}

User.contextType = StoreContext

export default withRouter(User)