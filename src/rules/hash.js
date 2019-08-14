const v = require('validator');

module.exports = async function hash(field, value, args) {
  return v.isHash(String(value), args);
};
