const contains = require('./contains');

module.exports = async function notContains(...args) {
  return !(await contains(...args));
};
