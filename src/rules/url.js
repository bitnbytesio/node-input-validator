const v = require('validator');

module.exports = async function url(field, value) {
  return v.isURL(value);
};
