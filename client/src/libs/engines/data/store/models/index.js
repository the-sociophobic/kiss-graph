import _ from 'lodash'


const editableFields = model =>
  _.pickBy(model, (value, key) => !model[key].type.match(/\b(id|ref)\b/g))

const newInstance = model =>
  Object.keys(model)
  .map(key => {
    const encodeType = (model, key) => {
      if (model[key].default)
        return model[key].default

      switch (model[key].type) {
        case "number":
          return undefined
        case "string":
          return ""
        case "boolean":
          return ""
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

    return {[key]: encodeType(model, key)}
  })
  .reduce((a, b) => ({...a, ...b}))

const encode = (model, instance) =>
  Object.keys(model)
  .map(key => {
    const encodeType = (model, instance, key) => {
      switch (model[key].type) {
        case "point3d":
          return `point({x:${instance[key].x}, y:${instance[key].y}, z:${instance[key].z}})`
        case "object":
          return instance[key] && JSON.stringify(instance[key])
        case "array":
          return instance[key] && JSON.stringify(instance[key])
        case "id":
          return undefined
        case "ref":
          return undefined
        default:
          return instance[key]
      }
    }

    return {[key]: encodeType(model, instance, key)}
  })
  // .reduce((a, b) => ({...a, ...b}))
  .reduce((a, b) => _.pickBy({...a, ...b}, _.identity))

const encodeMany = (model, instances) =>
  JSON.stringify(
    instances.map(instance => encode(model, instance))
  )
  .replace(/"point/g, "point")
  .replace(/}\)"/g, "})")
  .replace(/(?<!\\)\"([^(\")"]+)(?<!\\)\":/g,"$1:")

const decode = (model, instance) =>
  Object.keys(model)
  .map(key => {
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

    return {[key]: decodeType(model, instance, key)}
  })
  // .reduce((a, b) => ({...a, ...b}))
  .reduce((a, b) => _.pickBy({...a, ...b}, _.identity))

  const decodeMany = (model, instances) => 
    instances?.data?.results[0]?.data.map(instance => decode(model, instance))


export {
  editableFields,
  newInstance,
  encode,
  encodeMany,
  decode,
  decodeMany,
}