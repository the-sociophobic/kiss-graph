export default (objectsArray, property) =>
  Array.from(
    new Set(
      objectsArray
        .map(object => object[property])
    )
  )
  .sort((a, b) => a - b)