module.exports = function string({ value }) {
  if (typeof value !== 'string') {
    return false;
  }

  return true;
};
