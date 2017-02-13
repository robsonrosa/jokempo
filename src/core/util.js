function hasValue(obj) {
  return obj !== null && obj !== undefined;
}

function isEmpty(arr) {
  return !arr || !Array.isArray(arr) || arr.length === 0;
}

function array(arr) {
  return isEmpty(arr) ? [] : arr;
}

function duplicated(arr, getFn) {
  let fn = getFn || (el => el);
  return !isEmpty(arr) && arr.filter((thisElement, thisIndex) => {
    let anotherElement = arr.find(e => fn(e) === fn(thisElement));
    let thatIndex = arr.indexOf(anotherElement);
    return thisIndex === thatIndex;
  }).length !== arr.length;
}

module.exports = {
  isEmpty: isEmpty,
  hasValue: hasValue,
  array: array,
  duplicated: duplicated
};
