const _has = require('lodash.has');
const empty = require('../util/empty');

module.exports = function sometimes({ attr, value }, v) {
  // @ts-ignore
  if (!_has(v.inputs, attr)) {
    return true;
  }

  if (empty.reallyEmptyTrimmed(value)) {
    return false;
  }

  return true;
};
