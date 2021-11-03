const empty = require('../util/empty');
const { pathIndex } = require('../util/ObjectIndex');

module.exports = function requiredWith({ attr, value, args }, v) {
  if (!args.length) {
    throw new Error(`Invalid arguments supplied for field ${attr} in required with rule.`);
  }

  let i; let required = false;

  for (i = 0; i < args.length; ++i) {
    if (args[i] === attr) {
      continue;
    }

    if (!empty.reallyEmptyTrimmed(pathIndex(v.inputs, args[i]))) {
      required = true;
      break;
    }
  }

  if (required && empty.reallyEmptyTrimmed(value)) {
    return false;
  }

  return true;
};
