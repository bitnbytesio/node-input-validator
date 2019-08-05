const v = require('validator');

module.exports = async function json(field, value) {
  if (!v.isJSON(String(value))) {
    return false;
  }

  return true;
};
