import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import Emoji, { EmojiByName } from 'components/Emoji'
import ExternalLink from 'components/ExternalLink'


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static contextType = StoreContext

  render = () => {
    const { node } = this.props

    if (typeof node === "undefined")
      return <div></div>

    return (
      <div className="node-info">
        {node.emoji &&
          <div className="node-info__emoji">
            <EmojiByName name={node.emoji} />
          </div>
        }
        <div className="secret">
          {node.social && Object.keys(node.social)
            .map(key => {
              switch(key) {
                case "vk":
                  return "vk.com/" + node.social[key]
                case "vk2":
                  return "vk.com/" + node.social[key]
                case "inst":
                  return "instagram.com/" + node.social[key]
                case "inst2":
                  return "instagram.com/" + node.social[key]
                case "twit":
                  return "twitter.com/" + node.social[key]
                case "yt":
                  return "www.youtube.com/" + node.social[key]
                case "fb":
                  return "www.facebook.com/" + node.social[key]
                case "tg":
                  return "t.me/" + node.social[key]
                case "steam":
                  return "steamcommunity.com/" + node.social[key]
                default:
                  return ""
              }
            })
            .map(link => link.length > 0 && (
              <ExternalLink
                key={link}
                to={"https://" + link}
                newTab
                className="secret__link"
              >
                random link
              </ExternalLink>))
          }
        </div>
        <div
          className="node-info__tags"
        >
          {Object.keys(node)
            .filter(key =>
              ["mentalDisorder", "iq", "dead", "offended"]
              .includes(key)
              &&
              typeof node[key] !== "undefined"
              &&
              node[key] !== false
            )
            .map(key =>
              <button
                key={key}
                className="node-info__tags__item"
                onClick={() => this.props.history.push("/stats/" + (key === "mentalDisorder" ? "mental" : (key === "offended" ? "triggered" : key)))} //REDO THIS SHIT
              >
                {({
                    mentalDisorder: () => <Emoji.mentalDisorder />,
                    iq: () => <Emoji.IQ />,
                    dead: () => <Emoji.dead />,
                    offended: () => <Emoji.triggered />,
                  })[key]()
                } {node[key]}
                {key === "mentalDisorder" && "/10 mental disorder"}
                {key === "iq" && " IQ"}
                {key === "dead" && " dead"}
                {key === "offended" && " triggered"}
              </button>
            )
          }
          <button
            className="node-info__tags__item"
            onClick={() => this.props.history.push("/stats/kisses")}
          >
            <Emoji.kiss /> {node.connections}{node.hiddenConnections ? <> ({node.hiddenConnections}<Emoji.hidden />)</> : ""}:
          </button>
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

export default withRouter(User)