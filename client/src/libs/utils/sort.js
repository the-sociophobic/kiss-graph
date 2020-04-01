const binarySearch = (array, element, compare_fn) => {
  if (array.length === 0 || compare_fn(element, array[0]) > 0)
    return 0
  if (compare_fn(element, array[array.length - 1]) < 0)
    return array.length
    
  let first = 0,
      last = array.length - 1

  while (first <= last) {
    const middle = (last + first) >> 1,
          cmp = compare_fn(element, array[middle])

    if (cmp > 0)
      last = middle - 1
    else
      if (cmp < 0)
        first = middle + 1
      else
        return middle
  }

  return first
}

const insertIntoSortedArray = (array, element, compare_fn) => {
  array.splice(binarySearch(array, element, compare_fn), 0, element)
}

export {
  insertIntoSortedArray
}