const { reallyEmpty } = require('../util/empty');

module.exports = function sometimes({ attr, value }, v) {
  // @ts-ignore
  if (!(attr in v.inputs)) {
    return true;
  }

  if (reallyEmpty(value)) {
    return false;
  }

  return true;
};
