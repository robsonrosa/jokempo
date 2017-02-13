function hasValue(obj) {
  return obj !== null && obj !== undefined;
}

function isEmpty(arr) {
  return !arr || !Array.isArray(arr) || arr.length === 0;
}

function array(arr) {
  return isEmpty(arr) ? [] : arr;
}

module.exports = {
  isEmpty: isEmpty,
  hasValue: hasValue,
  array: array,
 };
