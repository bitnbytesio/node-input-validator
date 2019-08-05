/**
 * check if given value is empty or not
 * @param {string} value
 * @return {boolean}
 */
module.exports = function empty(value) {
  // small patch for integer value 0 in required rules
  if (!value && value !== 0) {
    return true;
  }

  return !value.toString().trim();
};

module.exports.reallyEmpty = function reallyEmpty(value) {
  if (!value && [false, 0].indexOf(value) < 0) {
    return true;
  }

  return !value.toString().trim();
};
