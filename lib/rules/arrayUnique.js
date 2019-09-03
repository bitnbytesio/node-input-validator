module.exports = function arrayUnique({ value }) {
  if (!Array.isArray(value)) {
    return false;
  }

  return (new Set(value)).size === value.length;
};
