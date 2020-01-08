import _ from 'lodash'

export default (item, model) => 
  _.pickBy(item, (value, key) => Object.keys(model).includes(key))
