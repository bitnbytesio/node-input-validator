const { reallyEmpty } = require('../util/empty');

module.exports = function required({ value }) {
  if (reallyEmpty(value)) {
    return false;
  }
  return true;
};
