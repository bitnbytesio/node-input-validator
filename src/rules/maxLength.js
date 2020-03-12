/* eslint-disable radix */
const isInt = require('validator/lib/isInt').default;

module.exports = async function maxLength(field, value, maxNum) {
    if (!isInt(maxNum)) {
        return false;
    }

    if (value.toString().length > parseInt(maxNum)) {
        return false;
    }

    return true;
};
