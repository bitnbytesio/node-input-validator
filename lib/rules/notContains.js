const contains = require('./contains');

module.exports = function notContains(...args) {
  return !contains(...args);
};
