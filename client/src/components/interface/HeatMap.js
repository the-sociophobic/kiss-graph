import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import heatMap from 'img/heat2h.png'
import KissEmoji from 'components/KissEmoji'
import isTouchDevice from 'libs/utils/isTouchDevice'


export default class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static contextType = StoreContext

  render = () => {
    const { weightSet } = this.context.store.get()

    return (
      <div className="heat-map">
        <img src={heatMap} alt="heatMap.png" />
        <div className="heat-map__0">{weightSet[weightSet.length - 1]}</div>
        <div className="heat-map__1">{weightSet[Math.round((weightSet.length - 1) / 4 * 3)]}</div>
        <div className="heat-map__2">{weightSet[Math.round((weightSet.length - 1) / 2)]}</div>
        <div className="heat-map__3">{weightSet[Math.round((weightSet.length - 1) / 4)]}</div>
        <div className="heat-map__4">{weightSet[0]}</div>
        {/* {!isTouchDevice() &&
          <div className="heat-map__description">
            number of<KissEmoji />
          </div>
        } */}
      </div>
    )
  }
}