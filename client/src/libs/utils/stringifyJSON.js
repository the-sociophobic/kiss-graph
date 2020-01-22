function stringify(obj_from_json) {
  if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json))
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json).replace(/\"([^(\")"]+)\":/g,"$1:")

  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object
    .keys(obj_from_json)
    .map(key => `${key}:${stringify(obj_from_json[key])}`)
    .join(",")

    console.log(props)

  return `{${props}}`
}

export default stringify