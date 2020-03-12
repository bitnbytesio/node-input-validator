const isInt = require('validator/lib/isInt').default;

module.exports = async function integer(field, value) {
    if (!isInt(`${value}`)) {
        return false;
    }

    return true;
};
