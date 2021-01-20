const v = require('validator');

module.exports = function alpha({ value, args }) {
  if (v.isAlpha(String(value), ...args)) {
    return true;
  }

  return false;
};
