import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'
import List from 'components/interface/List'
import Emoji, { EmojiByName } from 'components/Emoji'
import ExternalLink from 'components/ExternalLink'
import { parseLinks } from 'libs/utils/social'
import isProduction from '../../libs/utils/isProduction'
import copyToClipboard from 'libs/utils/copyToClipboard'
import openInNewTab from 'libs/utils/openInNewTab'
import { getPostsByHashtag } from 'libs/utils/vkAPI'


const sortByTypePriority = [
  "DEBATED",
  "KISS",
  "BREAKUP",
  "DATE",
  "SEX",
  "MARRIED",
]


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSecretLinks: !isProduction(),
      copied: false,
      sortBy: "date",
      orderDesc: true,
    }

    this.updateNumberOfHashtagPosts()
  }

  updateNumberOfHashtagPosts = async () => {
    console.log(await getPostsByHashtag({
      owner_id: "-190713011",
      hashtag: this.props.node.hashtag,
    }))
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
        onClick: () => this.setState({showSecretLinks: !this.state.showSecretLinks}),
        className: "node-info__tags__item--emoji",
        // style: {background: `linear-gradient(var(--button-color) 50%, var(--weight-color-${node.connections}) 100%)`},
        style: {backgroundColor: `var(--weight-color-${node.connections})`},
        render: node =>
          <EmojiByName name={node.emoji} />
      },
      {
        name: "name",
        onClick: () => {
          copyToClipboard(`${node.hashtag ? `#${node.hashtag}@i_love_my_frens \n` : ""}https://kiss-graph.com/node/${node.link}\n`)
          this.setState({copied: true})
          setTimeout(() => this.setState({copied: false}), 10000)
        },
        render: () => <>
          <Emoji.copy /> {this.state.copied ? "Copied to clipboard" : "Copy"}
        </>
      },
      {
        name: "specialSite",
        onClick: () => openInNewTab(node.specialSite),
        render: () => <>
          <EmojiByName name={node.specialSiteEmoji || "world"} /> {node.specialSiteName || node.name}
        </>
      },
      {
        name: "hashtag",
        onClick: () => {
          openInNewTab(`https://vk.com/wall-190713011?q=%23${node.hashtag}`, true)
          node.hashtag2 && openInNewTab(`https://vk.com/wall-190713011?q=%23${node.hashtag2}`)
        },
        render: () => <>
          #{node.hashtag}
        </>
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
        onClick: () => this.props.history.push("/stats/marriages"),
        render: () =>
          <>
            <Emoji.married /> {node.sposes.length}
          </>
      },
      {
        name: "sex",
        render: () =>
          <>
            <Emoji.sex /> {node.sex.length}
          </>
      },
      {
        name: "date",
        onClick: () => this.props.history.push("/stats/dates"),
        render: () =>
          <>
            <Emoji.heart /> {node.date.length}
          </>
      },
      {
        name: "breakup",
        onClick: () => this.props.history.push("/stats/break-ups"),
        render: () =>
          <>
            <Emoji.heartBroken /> {node.breakup.length}
          </>
      },
      {
        name: "debated",
        onClick: () => this.props.history.push("/stats/unrecognized"),
        render: () =>
          <>
            <Emoji.womanBan /> {node.debated.length}
          </>
      },
      {
        name: "mates",
        link: "kisses",
        render: () =>
          <>
            <Emoji.kiss /> {node.connections}
            {node.hiddenConnections ? <> ({node.hiddenConnections}<Emoji.hidden />)</> : ""}
          </>
      }
    ]

    return (
      <div className="node-info__tags">
      {propsMap
      .filter(prop =>
        !(Array.isArray(node[prop.name]) && node[prop.name].length === 0))
      .map(prop =>
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

  setSortBy = sortBy => this.setState({
    sortBy: sortBy,
    orderDesc: this.state.sortBy === sortBy ? !this.state.orderDesc : (sortBy !== "name")
  })

  renderConnections = connections =>
    connections.length > 0 && (
      <div className="node-info__connections">
        <div className="username-link username-link--sort">
          <div
            className={"username-link__type " + (this.state.sortBy === "type" &&
              (this.state.orderDesc ? "desc-order" : "asc-order"))}
            onClick={() => this.setSortBy("type")}
          >
            <Emoji.folder />
          </div>
          <div
            className={"username-link__number " + (this.state.sortBy === "number" &&
              (this.state.orderDesc ? "desc-order" : "asc-order"))}
            onClick={() => this.setSortBy("number")}
          >
            <Emoji.kiss />
          </div>
          <div
            className={"username-link__name " + (this.state.sortBy === "name" &&
              (this.state.orderDesc ? "desc-order" : "asc-order"))}
            onClick={() => this.setSortBy("name")}
          >
            node
          </div>
          <div
            className={"username-link__date " + (this.state.sortBy === "date" &&
              (this.state.orderDesc ? "desc-order" : "asc-order"))}
            onClick={() => this.setSortBy("date")}
          >
            commited
          </div>
        </div>
        <List items={connections
          .sort((a, b) => {
            const { sortBy, orderDesc } = this.state
            const multiplier = orderDesc ? 1 : -1

            switch (sortBy) {
              case "type":
                return (sortByTypePriority.indexOf(b.type) - sortByTypePriority.indexOf(a.type)) * multiplier
              case "number":
                return (b.connections - a.connections) * multiplier
              case "name":
                const aName = a.userName || a.name
                const bName = b.userName || b.name

                return bName.localeCompare(aName) * multiplier
              default:
                return (b[sortBy] - a[sortBy]) * multiplier
            }
          })
          .map(connection =>
            [<UserNameLink
              key={connection.userName || connection.name}
              user={connection}
              setNode={this.props.setNode}
              date={connection.date}
              emoji={connection.typeEmoji}
            />]
          )}
        />
      </div>
    )
          
  render = () => {
    let { node } = this.props

    if (typeof node === "undefined")
      return <></>

    if (isProduction())
      node = {
        ...node,
        sex: [],
      }

    let nodeProps = {
      emoji: "person",
      ...node,
    }
  
    return (
      <div className="node-info">
        {this.state.showSecretLinks &&
          <div className="secret">
            {this.renderSocialLinks(node)}
          </div>}
        
        {this.renderProps(nodeProps)}

        {this.renderConnections([
          ...node.sposes.map(spose => ({...spose, typeEmoji: "married"})),
          ...node.debated.map(mate => ({...mate, typeEmoji: "womanBan"})),
          ...node.mates.map(mate => ({...mate, typeEmoji: "kiss"})),
          ...node.sex.map(spose => ({...spose, typeEmoji: "sex"})),
          ...node.date.map(mate => ({...mate, typeEmoji: "heart"})),
          ...node.breakup.map(mate => ({...mate, typeEmoji: "heartBroken"})),
        ].sort((a, b) => b. connections - a.connections)
        )}

      </div>
    )
  }
}

User.contextType = StoreContext

export default withRouter(User)