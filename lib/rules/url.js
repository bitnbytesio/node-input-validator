const v = require('validator');

module.exports = function url({ value }) {
  if (typeof value !== 'string') {
    return false;
  }

  return v.isURL(value);
};
