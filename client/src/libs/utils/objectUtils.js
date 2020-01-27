import _ from 'lodash'

const filterKeys = (item, model) => 
  _.pickBy(item, (value, key) => Object.keys(model).includes(key))

const flatten = (obj, parentName = "") =>
  Object.keys(obj).length > 0 ?
    Object.keys(obj).map(key => {
      if (typeof obj[key] !== "object")
        return ({[parentName + key]: obj[key]})
      else
        return flatten(obj[key], parentName + key + ".")
    })
    .reduce((a, b) => ({...a, ...b}))
    :
    {}

const deflatten = obj => {
  const firstLevelProps = _.pickBy(obj, (value, key) => !key.includes("."))
  const secondLevelProps = _.pickBy(obj, (value, key) => key.includes("."))
  let newObj = firstLevelProps

  Object.keys(secondLevelProps).forEach(key => {
    const parentName = key.split(".")[0]
    const properyName = key.slice(parentName.length + 1)

    if (typeof newObj[parentName] === "undefined")
      newObj[parentName] = {}
    
    newObj[parentName] = {
      ...newObj[parentName],
      [properyName]: obj[key],
    }
  })

  return Object.keys(newObj).length > 0 ?
    Object.keys(newObj)
      .map(key => typeof newObj[key] === "object" ?
        {[key]: deflatten(newObj[key])}
        :
        {[key]: newObj[key]}
      )
      .reduce((a, b) => ({...a, ...b}))
    :
    {}
}

export {
  filterKeys,
  flatten,
  deflatten,
}