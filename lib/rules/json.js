const v = require('validator');

module.exports = function json({ value }) {
  if (!v.isJSON(String(value))) {
    return false;
  }

  return true;
};
