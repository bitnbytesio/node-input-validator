const v = require('validator');

module.exports = async function hexColor(field, value) {
  return v.isHexColor(String(value));
};
