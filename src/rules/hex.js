const isHexadecimal = require('validator/lib/isHexadecimal').default;

module.exports = async function hex(field, value) {
    return isHexadecimal(value);
};
