const v = require('validator');

module.exports = async function ascii(field, value) {

    if (v.isAscii(value)) {

        return true;
    }

    return false;

}