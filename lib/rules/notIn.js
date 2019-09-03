
const inRule = require('./in');

module.exports = function notIn(...args) {
  return !inRule(...args);
};
