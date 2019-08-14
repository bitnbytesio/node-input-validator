const v = require('validator');

module.exports = async function decimal(field, value) {
  return v.isDecimal(`${parseFloat(value)}`);
};
