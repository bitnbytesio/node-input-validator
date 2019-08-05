const v = require('validator');

module.exports = async function integer(field, value) {
  if (!v.isInt(String(value))) {
    return false;
  }

  return true;
};
