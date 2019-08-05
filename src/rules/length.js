
module.exports = async function length(field, value, args) {
  let min;

  const max = parseInt(args[0] || args);

  if (args[1]) {
    min = parseInt(args[1]);
  }


  const valueLength = value.length;

  if (valueLength <= max) {
    if (min && valueLength < min) {
      return false;
    }

    return true;
  }

  return false;
};
