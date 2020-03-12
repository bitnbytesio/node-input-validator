const isAscii = require('validator/lib/isAscii').default;

module.exports = async function ascii(field, value) {
    if (isAscii(value)) {
        return true;
    }

    return false;
};
