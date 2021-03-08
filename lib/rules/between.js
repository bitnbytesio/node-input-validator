const numeric = require('./numeric');

module.exports = function between({ attr, value, args }) {
  if (args.length !== 2) {
    throw new Error(`The number of arguments for between in the field ${attr} are invalid.`);
  }

  let [min, max] = args;

  if (!numeric({ value: min }) || !numeric({ value: max })) {
    throw new Error(`Seeds must be numeric for ${attr} under between rule.`);
  }

  min = parseFloat(min);
  max = parseFloat(max);

  if (min >= max) {
    throw new Error(`Seed min must be less then max in between rule for ${attr}.`);
  }

  if (Array.isArray(value)) {
    if (value.length < min || value.length > max) {
      return false;
    }
    return true;
  }

  if (numeric({ value })) {
    const val = Number(value);

    if (val < min || val > max) {
      return false;
    }

    return true;
  }

  return false;
};
