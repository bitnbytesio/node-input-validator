
module.exports = async function string(field, value) {
  // console.log(...arguments);
  // process.exit(1);

  if (typeof value !== 'string') {
    return false;
  }

  return true;
};
