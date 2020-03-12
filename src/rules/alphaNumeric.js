const isAlphanumeric = require('validator/lib/isAlphanumeric').default;

module.exports = async function alphaNumeric(field, value) {
    if (!isAlphanumeric(`${value}`)) {
        return false;
    }

    return true;
};
