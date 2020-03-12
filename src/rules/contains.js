const containsFn = require('validator/lib/contains').default;

module.exports = async function contains(field, value, inString) {
    if (!containsFn(value, inString.toString())) {
        return false;
    }

    return true;
};
