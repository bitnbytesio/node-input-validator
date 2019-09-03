const v = require('validator');

module.exports = function hexColor({ value }) {
  return v.isHexColor(String(value));
};
