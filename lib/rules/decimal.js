const v = require('validator');

module.exports = function decimal({ value }) {
  return v.isDecimal(String(value));
};
