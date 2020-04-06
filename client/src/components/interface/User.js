import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import Emoji, { EmojiByName } from 'components/Emoji'
import ExternalLink from 'components/ExternalLink'
import { parseLinks } from 'libs/utils/social'


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderSocialLinks = node =>
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
        name: "mentalDisorder",
        link: "mental",
        text: "/10 mental disorder"
      },
      {
        name: "iq",
        emoji: "IQ",
        text: " IQ",
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
          className="node-info__tags__item"
          onClick={() => this.props.history.push("/stats/" + (prop.link || prop.name))}
        >
          {prop.render ? prop.render() :
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
        {node.emoji &&
          <div className="node-info__emoji">
            <EmojiByName name={node.emoji} />
          </div>
        }
        <div className="secret">
          {this.renderSocialLinks(node)}
        </div>
        <div className="node-info__tags">
          {this.renderProps(node)}
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