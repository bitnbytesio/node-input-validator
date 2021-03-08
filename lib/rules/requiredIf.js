const { reallyEmpty } = require('../util/empty');
const { pathIndex } = require('../util/ObjectIndex');

module.exports = function requiredIf({ attr, value, args }, v) {
  if (!args || args.length < 2) {
    throw new Error(`Invalid arguments supplied for field ${attr} in requiredIf rule.`);
  }

  if (args.length % 2 !== 0) {
    throw new Error(`Invalid arguments supplied for field ${attr} in requiredIf rule.`);
  }

  let required = false;
  for (let start = 0; start < args.length; start += 2) {
    const requiredField = args[start];
    const requiredValue = args[start + 1];

    if (requiredField === attr) {
      return false;
    }

    // field is required if all values are presented
    if (!reallyEmpty(pathIndex(v.inputs, requiredField))
      && pathIndex(v.inputs, requiredField).toString() === requiredValue) {
      required = true;
    } else {
      required = false;
      break;
    }
  }

  if (required && reallyEmpty(value)) {
    return false;
  }

  return true;
};
