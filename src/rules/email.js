const v = require('validator');

module.exports = async function email(field, value) {
  if (!v.isEmail(String(value))) {
    return false;
  }

  return true;
};
