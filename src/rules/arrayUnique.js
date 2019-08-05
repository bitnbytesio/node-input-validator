module.exports = async function arrayUnique(field, value) {
  if (!Array.isArray(value)) {
    return false;
  }

  return (new Set(value)).size === value.length;
};
