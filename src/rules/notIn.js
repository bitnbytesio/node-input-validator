
const _in = require('./in');

module.exports = async function notIn(...args) {
  return !(await _in(...args));
};
