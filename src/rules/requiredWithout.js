const { reallyEmpty } = require('../lib/empty');
const { pathIndex } = require('../lib/ObjectIndex');

module.exports = async function requiredWithout(field, value, args) {
  if (!args) {
    throw `Invalid arguments supplied for field ${field} in requiredWithout rule.`;
  }

  if (!Array.isArray(args)) args = [args];

  let i; let required = false;

  for (i = 0; i < args.length; ++i) {
    if (args[i] === field) {
      continue;
    }

    // @ts-ignore
    if (reallyEmpty(pathIndex(this.inputs, args[i]))) {
      required = true;
      break;
    }
  }

  if (required && reallyEmpty(value)) {
    return false;
  }

  return true;
};
