const v = require('validator');

module.exports = async function hash(field, value, hash) {
    return v.isHash(String(value), hash);
}