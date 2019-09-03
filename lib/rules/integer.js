const v = require('validator');

module.exports = function integer({ value }) {
  return v.isInt(String(value));
};
