const isAlpha = require('validator/lib/isAlpha').default;

module.exports = async function alpha(field, value) {
    if (isAlpha(value)) {
        return true;
    }

    return false;
};
