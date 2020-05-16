import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import StoreContext from 'libs/engines/data/store/StoreContext'
import NameSearch from 'components/interface/NameSearch'
import Select from 'components/Form/Select'
import Form from './Form'

import personModel from 'libs/engines/data/store/models/person'
import conceptModel from 'libs/engines/data/store/models/concept'

import {
  editableFields,
  flattenEditableModel,
  flattenNewInstance,
  deflattenDataByModel,
  isPerson
} from 'libs/engines/data/store/models'
import {
  flatten,
  filterKeys,
  undefinedToEmptyString,
} from 'libs/utils/objectUtils'
  

class EditNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentModel: personModel,
    }
    this.nameSearchRef = React.createRef()
  }

  createEmptyNode = (name, model) => {
    const currentModel = model || this.state.currentModel
    let instance = {
      ...flattenNewInstance(this.state.currentModel),
      name: name,
    }

    if (isPerson(currentModel)) {
      let target = this.context.threeSceneRef?.current?.controls?.target

      instance = {
        ...instance,
        "pos.x": target?.x + Math.random() / 2 - .25,
        "pos.y": target?.y + Math.random() / 2 - .25,
        "pos.z": target?.z + Math.random() / 2 - .25,
      }
    }

    return instance
  }

  setNode = input => {
    let { currentModel } = this.state
    let node

    if (input === null || typeof input === "undefined" || input.name === null || input.name === "")
      node = this.createEmptyNode(input.name)
    else {
      node = input
      if (typeof input.id !== "undefined")
        if (isPerson(node)) {
          currentModel = personModel
          this.context.threeSceneRef && this.context.threeSceneRef.current.setCamera(node.pos)
        }
        else
          currentModel = conceptModel

      node = {
        ...this.createEmptyNode(node.name, currentModel),
        ...flatten(filterKeys(node, {
          id: {}, //so actual id will not be filtered
          ...editableFields(personModel)
        }))
      }
    }

    this.props.setNodeId(node.id)
    this.setState({currentModel: currentModel})
    this.setState(undefinedToEmptyString(flatten(node)))
  }

  save = async () => {
    const nodeFromStore = await this.context.store
      .push(deflattenDataByModel(this.state, this.state.currentModel))
    this.setNode(nodeFromStore)
  }
  delete = async () => {
    await this.context.store
      .delete(deflattenDataByModel(this.state, this.state.currentModel))
    this.setNode({name: null})
  }

  onEnterPress = e => {
    if (e.keyCode === 13) {
      this.setNode({name: e.target.value})
      this.nameSearchRef.current && this.nameSearchRef.current.close()
    }
  }

  render = () => {
    const isNew = typeof this.state.id !== "number"
    const { name, currentModel } = this.state

    return (
      <div className="edit-node">
        <NameSearch
          ref={this.nameSearchRef}
          node={this.state}
          onChange={value => this.setNode(value)}
          onKeyDown={e => this.onEnterPress(e)}
          className="mb-4"
          optionsNumber={15}
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
            {isNew &&
              <Select
                value={this.state.currentModel}
                onChange={model => this.setState({
                  ...this.createEmptyNode(name, model),
                  currentModel: model
                })}
                options={[
                  {value: personModel, label: "Person"},
                  {value: conceptModel, label: "Concept"},
                ]}
                label={"node type"}
              />
            }
            <Form
              state={this.state}
              setState={this.setState.bind(this)}
              model={flattenEditableModel(currentModel)}
            />
          </Fragment>        
        )}
      </div>
    )
  }
}

EditNode.contextType = StoreContext

export default EditNode
