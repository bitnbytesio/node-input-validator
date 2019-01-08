const v = require('validator');

module.exports = async function maxLength(field, value, maxNum) {

    if (!v.isInt(maxNum)) {
        return false;
    }

    if (value.toString().length > parseInt(maxNum)) {
        return false;
    }

    return true;
}