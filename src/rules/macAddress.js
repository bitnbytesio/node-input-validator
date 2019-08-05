const v = require('validator');

module.exports = async function macAddress(field, value) {
  return v.isMACAddress(String(value));
};
