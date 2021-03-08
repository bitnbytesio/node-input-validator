/* eslint-disable radix */

module.exports = function length({ value, args }) {
  let min;

  const max = parseInt(args[0]);

  if (args[1]) {
    min = parseInt(args[1]);
  }

  const valueLength = value.length;

  if (valueLength <= max) {
    if (min && valueLength < min) {
      return false;
    }

    return true;
  }

  return false;
};
