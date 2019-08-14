const { reallyEmpty } = require('../lib/empty');

module.exports = async function required(field, value) {
  if (reallyEmpty(value)) {
    return false;
  }

  return true;
};
