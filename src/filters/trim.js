/**
 * trim filter
 * @param {string} value
 * @returns {Promise.<string>}
 */
module.exports = async function trim(value) {
    return value.trim();
}