const v = require('validator');

module.exports = function macAddress({ value }) {
  return v.isMACAddress(String(value));
};
