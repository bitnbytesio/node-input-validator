const v = require('validator');

module.exports = async function minLength(field, value, minNum) {
    if (!v.isInt(minNum)) {
        return false;
    }

    if (value.toString().length < parseInt(minNum)) {
        return false;
    }

    return true;
}