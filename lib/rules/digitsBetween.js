/* eslint-disable radix */
const numeric = require('./numeric');
const integer = require('./integer');

module.exports = function digitsBetween({ attr, value, args }) {
  // const isNumeric = numeric({ attr,value });

  if (args.length !== 2) {
    throw new Error(`The number of arguments for digitsBetween rule in the field ${attr} are invalid.`);
  }

  let [min, max] = args;

  if (!integer({ value: min }) || !integer({ value: max })) {
    throw new Error(`Seeds must be integer for ${attr} under digitsBetween rule.`);
  }

  if (!numeric({ value })) {
    return false;
  }

  min = parseInt(min);
  max = parseInt(max);

  if (min >= max) {
    throw new Error(`Seed min must be less then max in digitsBetween rule for ${attr}.`);
  }

  if (value.length < min || value.length > max) {
    return false;
  }

  return true;
};
