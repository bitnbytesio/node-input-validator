const isEmail = require('validator/lib/isEmail').default;

module.exports = async function email(field, value) {
    if (!isEmail(value)) {
        return false;
    }

    return true;
};
