const v = require('validator');

module.exports = function hash({ value, args }) {
  return v.isHash(String(value), args);
};
