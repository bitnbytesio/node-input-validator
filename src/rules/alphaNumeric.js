const v = require('validator');

module.exports = async function alphaNumeric(field, value) {

    if (!v.isAlphanumeric(value + '')) {

        return false;
    }

    return true;
}