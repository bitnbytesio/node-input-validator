const _has = require('lodash.has');
const { reallyEmpty } = require('../util/empty');

module.exports = function sometimes({ attr, value }, v) {
  // @ts-ignore
  if (!_has(v.inputs, attr)) {
    return true;
  }

  if (reallyEmpty(value)) {
    return false;
  }

  return true;
};
