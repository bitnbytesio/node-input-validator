/**
 * trim filter
 * @param {string} value
 * @return {Promise.<string>}
 */
module.exports = function trim(value) { /* istanbul ignore next */
  return Promise.resolve(value.trim());
};
