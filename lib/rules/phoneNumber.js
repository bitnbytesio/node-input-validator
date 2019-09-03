const v = require('validator');

module.exports = function phoneNumber({ value }) {
  // @ts-ignore
  return v.isMobilePhone(String(value));
};
