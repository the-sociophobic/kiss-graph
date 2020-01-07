import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import StoreContext from 'libs/engines/data/store/StoreContext'
import NameSearch from 'components/interface/NameSearch'
import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import model from './model'


class EditNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localCopy: {},
    }
  }

  createEmptyNode = name => {
    let target = this.context.threeSceneRef.current.controls.target

    return {
      ...model,
      id: this.context.store.get().nodes.length,
      name: name,
      pos: {
        x: target.x,
        y: target.y,
        z: target.z,
      }
    }
  }

  setNode = nodeName => {
    const node = this.context.store.search({name: nodeName})[0]

    if (node === null)
      this.setState({localCopy: this.createEmptyNode(nodeName)})
    else {
      this.setState({localCopy: _.merge(this.createEmptyNode(nodeName), node)})
    }
  }

  renderKey = key => {
    switch (typeof this.state.localCopy[key]) {
      case "object":
        return (
          Object.keys(this.state.localCopy[key])
            .map(keyKey =>
              <Input
                key={key + keyKey}
                className="edit-node__input"
                value={this.state.localCopy[key][keyKey]}
                onChange={value => this.setState({
                  localCopy: {
                    ...this.state.localCopy,
                    [key]: {
                      ...this.state.localCopy[key],
                      [keyKey]: value
                    }  
                  }
                })}
                label={`${key}: ${keyKey}`}
              />
            )
        )
      case "boolean":
        return (
          <Checkbox
            key={key}
            value={this.state.localCopy[key]}
            onChange={value => this.setState({
              localCopy: {...this.state.localCopy, [key]: value}
            })}
          >
            {key}
          </Checkbox>
        )
      default:
        return (
          <Input
            key={key}
            className="edit-node__input"
            value={this.state.localCopy[key]}
            onChange={value => this.setState({
              localCopy: {...this.state.localCopy, [key]: value}
            })}
            label={key}
          />
        )
    }
  }

  render = () => (
    <div className="edit-node">
      <NameSearch
        node={this.props.node}
        onChange={value => this.setNode(value)}
        className="mb-4"
      />
      {this.state.localCopy && (
        <Fragment>
          {Object.keys(this.state.localCopy)
            .filter(key => Object.keys(model).includes(key))
            .map(key => this.renderKey(key))}
          <button
            className="edit-node__button"
            onClick={() => this.props.onChange(this.state.localCopy)}
          >
            Save
          </button>
        </Fragment>        
      )}
    </div>
  )
}

EditNode.contextType = StoreContext

export default EditNode
