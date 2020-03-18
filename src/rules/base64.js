const isBase64 = require('validator/lib/isBase64').default;

module.exports = async function base64(field, value) {
    if (isBase64(value)) {
        return true;
    }

    return false;
};
