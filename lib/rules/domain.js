const v = require('validator');

module.exports = function domain({ value }) {
  return v.isFQDN(String(value));
};
