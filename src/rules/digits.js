const v = require('validator');
const numeric = require('./numeric');

module.exports = async function digits(field, value, dNumber) {
  if (!(await numeric(field, dNumber))) {
    throw `Please provide a numeric value for ${field} under digits rule.`;
  }

  if (!v.isInt(String(value))) {
    return false;
  }

  if (Number(dNumber) !== value.toString().length) {
    return false;
  }

  return true;
};
