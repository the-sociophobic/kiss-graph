import React, { Component } from 'react'
import StoreContext from 'libs/engines/data/store/StoreContext'
import heatMap from 'img/heat2h.png'
import Emoji from 'components/Emoji'
// import isTouchDevice from 'libs/utils/isTouchDevice'


export default class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.heatMapRef = React.createRef()
  }

  static contextType = StoreContext

  render = () => {
    const { weightSet } = this.context.store.get()
    const { node } = this.props
    let heatMapHeight, nodeUV = 0

    if (this.heatMapRef.current && node) {
      heatMapHeight = this.heatMapRef.current.clientHeight
      //node.uv exists, but it is used for textures (no 1, only .97. Prevents tex overlap)
      nodeUV = weightSet.indexOf(node.connections) / (weightSet.length - 1)
    }

    return (
      <div className="heat-map">
        <img
          src={heatMap}
          alt="heatMap.png"
          ref={this.heatMapRef}
        />
        <div className="heat-map__0">{weightSet[weightSet.length - 1]}</div>
        <div className="heat-map__1">{weightSet[Math.round((weightSet.length - 1) / 4 * 3)]}</div>
        <div className="heat-map__2">{weightSet[Math.round((weightSet.length - 1) / 2)]}</div>
        <div className="heat-map__3">{weightSet[Math.round((weightSet.length - 1) / 4)]}</div>
        <div className="heat-map__4">{weightSet[0]}</div>
        {node &&
          <div
            className="heat-map__pointer"
            style={{marginTop: Math.round((1 - nodeUV) * heatMapHeight) + "px"}}
          >
            <Emoji.pointer />
          </div>
        }
        {/* {!isTouchDevice() &&
          <div className="heat-map__description">
            number of<KissEmoji />
          </div>
        } */}
      </div>
    )
  }
}