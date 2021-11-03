const empty = require('../util/empty');

module.exports = function required({ value }) {
  if (empty.reallyEmptyTrimmed(value)) {
    return false;
  }
  return true;
};
