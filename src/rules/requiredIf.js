const empty = require('../lib/empty');
const { pathIndex } = require('../lib/ObjectIndex');

module.exports = async function requiredIf(field, value, args) {
  if (!args || args.length < 2) {
    throw new Error(`Invalid arguments supplied for field ${field} in requiredIf rule.`);
  }

  if (args.length % 2 !== 0) {
    throw new Error(`Invalid arguments supplied for field ${field} in requiredIf rule.`);
  }

  let required = false;
  for (let start = 0; start < args.length; start += 2) {
    const requiredField = args[start];
    const requiredValue = args[start + 1];

    if (requiredField === field) {
      return false;
    }

    // field is required if all values are presented
    if (!empty(pathIndex(this.inputs, requiredField))
            && pathIndex(this.inputs, requiredField).toString() === requiredValue) {
      required = true;
    } else {
      required = false;
      break;
    }
  }


  if (required && empty.reallyEmpty(value)) {
    return false;
  }

  return true;
};
