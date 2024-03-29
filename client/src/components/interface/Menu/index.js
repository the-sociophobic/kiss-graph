import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import RadioHeader from 'components/interface/RadioHeader'
import Feed from 'components/interface/Feed'
import Stats from 'components/interface/Stats'


class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render = () => (
    <RadioHeader
      options={{
        news: {
          label: () => "News",
          content: () => <Feed setNode={this.props.setNode} />
        },
        stats: {
          label: () => "Stats",
          content: () => <Stats setNode={this.props.setNode} />
        },
      }}
      initialOptionFromURL
    />
  )
}

export default withRouter(Menu)