module.exports = function _in({ value, args }) {
  if (args.indexOf(String(value)) < 0) {
    return false;
  }

  return true;
};
