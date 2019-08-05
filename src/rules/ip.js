const v = require('validator');

module.exports = async function ip(field, value) {
  if (!v.isIP(String(value))) {
    return false;
  }

  return true;
};
