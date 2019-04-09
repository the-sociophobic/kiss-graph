import React, { Component } from 'react'
import Viever from 'components/Viewer'
import './index.sass'

export default class Layout extends Component {
  render = () => (
    <div className="page-container">
      <div className="viever-container" >
        <Viever />
      </div>
      <div className="interface-container">
        {this.props.children}
      </div>
    </div>
  )
}