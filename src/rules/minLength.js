/* eslint-disable radix */
const isInt = require('validator/lib/isInt').default;

module.exports = async function minLength(field, value, minNum) {
    if (!isInt(minNum)) {
        return false;
    }

    if (value.toString().length < parseInt(minNum)) {
        return false;
    }

    return true;
};
