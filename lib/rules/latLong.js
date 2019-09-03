const v = require('validator');

module.exports = function latLong({ value }) {
  if (v.isLatLong(String(value))) {
    return true;
  }

  return false;
};
