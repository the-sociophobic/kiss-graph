import React, { Component, Fragment } from 'react'
import RadioHeader from 'components/interface/RadioHeader'
import StoreContext from 'libs/engines/data/store/StoreContext'
import UserNameLink from 'components/interface/UserNameLink'

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "commited"
    }
    this.options = ["commited", "published", "told"]
  }

  static contextType = StoreContext

  componentDidMount() {
    const filterEdgesByProperty = (edges, prop) => edges
      .filter(edge => edge[prop])
    const mapNodesToEdges = edges => edges
      .map(edge => {
        const node0 = this.context.store.get({name: edge.node0})
        const node1 = this.context.store.get({name: edge.node1})

        return {
          ...edge,
          node0: {
            id: node0.id,
            name: node0.name,
            userName: node0.userName,
            link: node0.link,
            color: node0.color,
          },
          node1: {
            id: node1.id,
            name: node1.name,
            userName: node1.userName,
            link: node1.link,
            color: node1.color,
          },
        }
      })

    const {edges} = this.context.store.get()

    this.options.forEach(option => {
      this[option] = mapNodesToEdges(filterEdgesByProperty(edges, option))
    })
  }

  renderKisses = () => this[this.state.type] && this[this.state.type]
    .sort((a, b) => b[this.state.type] - a[this.state.type])
    .map(edge => (
      <div
        key={edge.id}
        className=""
      >
        <UserNameLink
          simple
          user={edge.node0}
          setNode={this.props.setNode}
        /> 💋<UserNameLink
          simple
          user={edge.node1}
          setNode={this.props.setNode}
        />
      </div>
    ))

  render = () => (
    <Fragment>
      <RadioHeader
        options={this.options}
        value={this.state.type}
        onChange={value => this.setState({type: value})}
      />
      {this.renderKisses()}
    </Fragment>
  )
}