let wildcardIterations = 1000;


function esc(key, options) {
  if (typeof options.escape === 'function') {
    return options.escape(key, options);
  }
  return key.split(options.separator).join(`\\${options.separator}`);
}

exports.setStrNotationRepetition = (repetition) => wildcardIterations = repetition;

exports.strNotations = function strNotations(target, customize = {}) {
  const options = {
    separator: '.',
    repetition: wildcardIterations,
    values: true,
    ...customize,
  };
  const sep = options.separator;
  const values = {};
  const keys = [];

  let currentRep = 0;

  function parse(obj, prev) {
    currentRep++;

    if (currentRep >= options.repetition) {
      // eslint-disable-next-line no-console
      throw new Error(`Max(${options.repetition}) repetation was reached.`);
    }

    const objKeys = Object.keys(obj);

    objKeys.forEach((k) => {
      const val = obj[k];
      const key = (prev ? prev + sep : '') + esc(k, options);

      if (Array.isArray(val) || (val !== null && typeof val === 'object')) {
        parse(val, key);
        keys.push(key);
        values[key] = val;
      } else {
        keys.push(key);
        values[key] = val;
      }
    });
  }

  parse(target);
  return options.values ? values : keys;
};
