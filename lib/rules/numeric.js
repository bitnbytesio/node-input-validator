const v = require('validator');

module.exports = function numeric({ value }) {
  return v.isNumeric(String(value));
};
