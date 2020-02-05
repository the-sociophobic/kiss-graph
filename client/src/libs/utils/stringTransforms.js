const dasherize = string => string
  .toLowerCase()
  .replace(/ /g, '-')

const camelize = string => string
  .toLowerCase()
  .split(' ')
  .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
  .reduce((a, b) => a + b)

const pathToName = string => string
  .replace(/-/g, ' ')

const nameToPath = string => (string || "") //REDO THIS SHIT TEST some nodes has no name?!
  .toLowerCase()
  .replace(/ /g, '-')

export {
  dasherize,
  camelize,
  pathToName,
  nameToPath
}