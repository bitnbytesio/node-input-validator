/* eslint-disable no-shadow */
const isHash = require('validator/lib/isHash').default;

module.exports = async function hash(field, value, hash) {
    return isHash(value, hash);
};
