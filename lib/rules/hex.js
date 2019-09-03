const v = require('validator');

module.exports = function hex({ value }) {
  return v.isHexadecimal(String(value));
};
