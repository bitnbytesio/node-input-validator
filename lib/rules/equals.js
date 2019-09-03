module.exports = function equals({ value, args }) {
  if (value !== args[0]) {
    return false;
  }

  return true;
};
