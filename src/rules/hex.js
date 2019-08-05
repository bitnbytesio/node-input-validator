const v = require('validator');

module.exports = async function hex(field, value) {
  return v.isHexadecimal(String(value));
};
