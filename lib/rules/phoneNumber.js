const v = require('validator');

module.exports = function phoneNumber({ value, args }) {
  // @ts-ignore
  return v.isMobilePhone(String(value), ...args);
};
