/**
 * parse named args
 * @param {Array} params
 * @return {Object}
 */
function namedArgs(params) {
  const obj = {};
  if (!Array.isArray(params)) {
    return obj;
  }

  params.forEach((i) => {
    const [k, v] = i.split('=');
    if (v && v.length) {
      obj[k.trim()] = v.trim() || null;
    }
  });

  return obj;
}

module.exports = namedArgs;
