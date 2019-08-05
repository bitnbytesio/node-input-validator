const v = require('validator');

module.exports = async function phoneNumber(field, value) {
  // @ts-ignore
  return v.isMobilePhone(String(value));
};
