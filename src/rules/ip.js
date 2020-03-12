const isIP = require('validator/lib/isIP').default;

module.exports = async function ip(field, value) {
    if (!isIP(value)) {
        return false;
    }

    return true;
};
