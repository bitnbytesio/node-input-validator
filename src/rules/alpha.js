const v = require('validator');

module.exports = async function alpha(field, value) {

    if (v.isAlpha(value)) {

        return true;
    }

    return false;

}