module.exports = async function arrayUniqueObjects(field, value, args) {
  if (!Array.isArray(value)) {
    return false;
  }

  args = Array.isArray(args) ? args : [args];


  const result = new Set(value.map((o) => {
    let output = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const attr of args) {
      output += o[attr];
    }

    return output;
  }));


  return result.size === value.length;
};
