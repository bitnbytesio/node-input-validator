const empty = require('../util/empty');
const { pathIndex } = require('../util/ObjectIndex');

module.exports = function acceptedNotIf({ attr, value, args }, validator) {
  if (!args || args.length < 2) {
    throw new Error(`Invalid arguments supplied for attribute ${attr} in acceptedNotIf rule.`);
  }

  if (args.length % 2 !== 0) {
    throw new Error(`Invalid arguments supplied for attribute ${attr} in acceptedNotIf rule.`);
  }

  const acceptedValues = [true, 'true', 1, '1', 'yes', 'on'];

  let canbetrue = false;
  for (let start = 0; start < args.length; start += 2) {
    const requiredField = args[start];
    const requiredValue = args[start + 1];

    if (requiredField === attr) {
      return false;
    }

    // field can be true if all values are presented
    if (!empty.reallyEmptyTrimmed(pathIndex(validator.inputs, requiredField))
      && pathIndex(validator.inputs, requiredField).toString() === requiredValue) {
      canbetrue = true;
    } else {
      canbetrue = false;
      break;
    }
  }
  if (canbetrue && acceptedValues.indexOf(value) >= 0) {
    return false;
  }

  return true;
};
