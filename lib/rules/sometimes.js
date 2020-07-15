const { reallyEmpty } = require('../util/empty');
const _ = require('lodash');

module.exports = function sometimes({ attr, value }, v) {
  if (!_.has(v.inputs, attr)) {
    return true;
  }

  if (reallyEmpty(value)) {
    return false;
  }

  return true;
};
