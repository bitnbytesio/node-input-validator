const integer = require('./integer');

module.exports = function lengthBetween({ attr, value, args }) {
  if (args.length !== 2) {
    throw new Error(`The number of arguments for length between in the field ${attr} are invalid.`);
  }

  let [min, max] = args;

  const isIntMin = integer({ value: min });
  const isIntMax = integer({ value: max });


  if (!isIntMin || !isIntMax) {
    throw new Error('Seeds must be integer for lengthBetween rule.');
  }

  min = parseInt(min);
  max = parseInt(max);

  if (min >= max) {
    throw new Error('Seed min must be less then max in lengthBetween.');
  }

  // if (Array.isArray(attribute)) {

  //     if (attribute.length < min || attribute.length > max) {
  //         return false;
  //     }

  //     return true;
  // }

  if (typeof value === 'string' || Array.isArray(value)) {
    if (value.length < min || value.length > max) {
      return false;
    }

    return true;
  }

  return false;
};
