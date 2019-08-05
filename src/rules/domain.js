const v = require('validator');

module.exports = async function domain(field, value) {
  return v.isFQDN(String(value));
};
