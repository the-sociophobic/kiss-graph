import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import StoreContext from 'libs/engines/data/store/StoreContext'
import NameSearch from 'components/interface/NameSearch'
import Input from 'components/Form/Input'
import Checkbox from 'components/Form/Checkbox'
import nodeModel from 'libs/engines/data/store/models/node'
import { newInstance, editableFields } from 'libs/engines/data/store/models'
import { flatten, deflatten, filterKeys } from 'libs/utils/objectUtils'


const flattenEditableFields = [
  ...Object.keys(flatten(editableFields(nodeModel)))
    .map(key => key.replace(".type", "").replace(".fields", "")),
  "pos.x",
  "pos.y",
  "pos.z",
]
const flattenNodeModel = Object.keys(flatten(nodeModel))
  .map(key => ({
    [key.replace(".type", "").replace(".fields", "")]: flatten(nodeModel)[key]
  }))
  .reduce((a, b) => ({...a, ...b}))


class EditNode extends Component {
  constructor(props) {
    super(props)
    this.state = flatten(newInstance(nodeModel))
    this.nameSearchRef = React.createRef()
  }

  createEmptyNode = name => {
    let target = this.context.threeSceneRef?.current?.controls?.target

    return {
      ...flatten(newInstance(nodeModel)),
      name: name,
      "pos.x": target?.x,
      "pos.y": target?.y,
      "pos.z": target?.z,
    }
  }

  setNode = nodeName => {
    if (nodeName === null || nodeName === "") {
      this.setState(flatten(newInstance(nodeModel)))
      return
    }

    let node = this.context.store.get({name: nodeName})
    console.log(node)

    if (node === null || typeof node === "undefined")
      node = this.createEmptyNode(nodeName)
    else {
      this.context.threeSceneRef.current && this.context.threeSceneRef.current.setCamera(node.pos)
      node = {
        ...this.createEmptyNode(nodeName),
        ...flatten(filterKeys(node, {
          id: {},
          ...editableFields(nodeModel)
        }))
      }
    }

    console.log(node)
    this.props.setNodeId(node.id)
    this.setState(node)
  }

  save = async () => {
    const nodeFromStore = await this.context.store.push(deflatten(this.state))
    this.setNode(nodeFromStore.name)
    this.context.store.copyData()
  }
  delete = async () => {
    await this.context.store.delete(deflatten(this.state))
    this.setNode(null)
    this.context.store.copyData()
  }

  renderKey = (model, key) => {
    switch (model[key]) {
      case "boolean":
        return (
          <Checkbox
            key={key}
            className="edit-node__checkbox"
            value={this.state[key]}
            onChange={value => this.setState({[key]: value})}
          >
            {key}
          </Checkbox>
        )
      default:
        return (
          <Input
            key={key}
            className="edit-node__input"
            value={this.state[key]}
            onChange={value => this.setState({[key]: value})}
            label={key}
          />
        )
    }
  }

  onEnterPress = e => {
    if (e.keyCode === 13) {
      this.setNode(e.target.value)
      this.nameSearchRef.current && this.nameSearchRef.current.close()
    }
  }

  render = () => {
    const isNew = typeof this.state.id === "undefined"

    return (
      <div className="edit-node">
        <NameSearch
          ref={this.nameSearchRef}
          node={this.props.node}
          onChange={value => this.setNode(value)}
          onKeyDown={e => this.onEnterPress(e)}
          className="mb-4"
        />
        {this.state.name && this.state.name.length > 0 && (
          <Fragment>
            <button
              className="edit-node__button"
              onClick={() => this.save()}
            >
              {isNew ? "Add" : "Update"}
            </button>
            {!isNew &&
              <button
                className="edit-node__button"
                onClick={() => this.delete()}
              >
                Delete
              </button>
            }
            {Object.keys(this.state)
              .filter(key => flattenEditableFields.includes(key))
              .map(key => this.renderKey(flattenNodeModel, key))}
          </Fragment>        
        )}
      </div>
    )
  }
}

EditNode.contextType = StoreContext

export default EditNode
