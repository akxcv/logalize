export { compareArrays }

function compareArrays (array1, array2) {
  if (array1.length !== array2.length) return false

  for (let [i, val] of array1.entries()) {
    if (val instanceof Array && array2[i] instanceof Array) {
      if (!compareArrays(val, array2[i])) return false
    } else if (val != array2[i]) {
      return false
    }
  }
  return true
}
