import React, { Component } from 'react'


const defaultMinItems = 30
const defaultOffset = 30

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shown: props.minItems || defaultMinItems,
    }
  }

  render = () => (
    <div className="List">
      {(this.props.items || [])
        .slice(0, this.state.shown)
        .map((item, index) => (
          <div
            key={index}
            className="List__Item"
          >
            {Array.isArray(item) ?
              item.map((part, index2) => (
                <div key={index + " " + index2}>
                  {part}
                </div>))
              :
              item
            }
          </div>
        ))}
      {(this.props.items || []).length > this.state.shown &&
        <button
          className="button--load-more"
          onClick={() => this.setState({shown: this.state.shown + (this.props.offset || defaultOffset)})}
        >
          Load more
        </button>
      }
    </div>
  )
}
