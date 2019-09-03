const v = require('validator');

module.exports = function contains({ value, args }) {
  const [find] = args;
  if (!v.contains(String(value), find)) {
    return false;
  }

  return true;
};
