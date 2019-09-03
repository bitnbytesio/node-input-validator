const v = require('validator');
const numeric = require('./numeric');

module.exports = function digits({ attr, value, args }) {
  const [dNumber] = args;
  if (!numeric({ value: dNumber })) {
    throw new Error(`Please provide a numeric value for ${attr} under digits rule.`);
  }

  if (!v.isInt(String(value))) {
    return false;
  }

  if (Number(dNumber) !== value.toString().length) {
    return false;
  }

  return true;
};
