import _ from 'lodash'


const editableFields = model =>
  _.pickBy(model, (value, key) =>
    !model[key].local &&
    !model[key].type.match(/\b(id|ref)\b/g)
  )


//CREATE NEW INSTANCE
const newInstance = model =>
  Object.keys(model)
    .map(key => ({
      [key]: newInstanceType(model, key)
    }))
    .reduce((a, b) => ({...a, ...b}))

  const newInstanceType = (model, key) => {
    if (model[key].default)
      return model[key].default

    switch (model[key].type) {
      case "number":
        return undefined
      case "string":
        return undefined
      case "boolean":
        return undefined
      case "object":
        if (model[key].fields)
          return newInstance(model[key].fields)
        return {}
      case "array":
        return []
      case "date":
        return undefined
      case "point3d":
        return {
          x: 0,
          y: 0,
          z: 0,
        }
      default:
        return undefined
    }
  }


//ENCODE FOR DB
const encode = (model, instance) =>
  Object.keys(model)
    .map(key => ({
      [key]: encodeType(model, instance, key)
    }))
    // .reduce((a, b) => ({...a, ...b}))
    .reduce((a, b) => _.pickBy({...a, ...b}, _.identity))

  const encodeType = (model, instance, key) => {
    if (model[key].local)
      return undefined

    const value = instance[key]

    switch (model[key].type) {
      case "point3d":
        return `point({x:${value.x}, y:${value.y}, z:${value.z}})`
      case "object":
        return value && JSON.stringify(value)
      case "array":
        return value && JSON.stringify(value)
      case "id":
        return undefined
      case "ref":
        return undefined
      case "number":
        let parsed = value

        if (typeof value === "string")
          parsed = value.includes(".") ? parseFloat(value) : parseInt(value)

        if (isNaN(parsed))
          return model[key].canBeString ? value : undefined
        return parsed
      case "select":
        if (typeof value === "undefined" && typeof model[key].default !== "undefined")
          return model[key].default
        if (model[key].options?.includes(value))
          return value
        return undefined
      default:
        return value
    }
  }
  
const encodeMany = (model, instances) =>
  encodeJSONstring(
    instances.map(instance => encode(model, instance))
  )

const encodeJSONstring = obj =>
  JSON.stringify(obj)
    .replace(/"point/g, "point")
    .replace(/}\)"/g, "})")
    .replace(/(?<!\\)\"([^(\")"]+)(?<!\\)\":/g,"$1:")
    //REDO THIS SHIT PARSE

//DECODE FROM DB
const decode = (model, instance) =>
  Object.keys(model)
    .map(key => ({
      [key]: decodeType(model, instance, key)
    }))
    // .reduce((a, b) => ({...a, ...b}))
    .reduce((a, b) => _.pickBy({...a, ...b}, (value, key) => typeof value !== "undefined"))

  const decodeType = (model, instance, key) => {
    const value = instance.row[0][key]

    switch (model[key].type) {
      case "point3d":
        const pos = value.coordinates
        return {
          x: pos[0],
          y: pos[1],
          z: pos[2],
        }
      case "object":
        return value && JSON.parse(value)
      case "array":
        return value && JSON.parse(value)
      case "social":
        return value && JSON.parse(value)
      default:
        return value
    }
  }

const decodeMany = (model, instances) => 
  instances?.data?.results[0]?.data.map(instance => decode(model, instance))


export {
  editableFields,
  newInstance,
  encode,
  encodeMany,
  encodeJSONstring,
  decode,
  decodeMany,
}