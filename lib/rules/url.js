const v = require('validator');

module.exports = function url({ value }) {
  return v.isURL(value);
};
