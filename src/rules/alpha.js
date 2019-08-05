const v = require('validator');

module.exports = async function alpha(field, value) {
  if (v.isAlpha(String(value))) {
    return true;
  }

  return false;
};
