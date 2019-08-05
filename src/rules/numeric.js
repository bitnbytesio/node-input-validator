module.exports = async function numeric(field, value) {
  return !isNaN(value) && isFinite(value);
};
