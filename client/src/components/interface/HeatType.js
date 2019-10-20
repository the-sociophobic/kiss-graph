import React, { Component } from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
import Emoji from 'components/Emoji'


export default class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static contextType = StoreContext

  render = () => (
    <div className="heat-type">
      {Object.keys(Emoji).map(key => {
        const Comp = Emoji[key]
        const type = this.props.type || "kiss"

        return (
          <button
            onClick={() => this.props.setType(key)}
            className={"heat-type__button " +
            (type === key && "heat-type__button--active")}
          >
            <div className="heat-type__button__emoji-container" >
              <Comp />
            </div>
          </button>
      )})}
    </div>
  )
}