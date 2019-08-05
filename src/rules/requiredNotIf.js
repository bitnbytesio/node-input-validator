const requiredIf = require('./requiredIf');

module.exports = async function requiredNotIf(...args) {
  return !(await requiredIf.apply(this, args));
};
