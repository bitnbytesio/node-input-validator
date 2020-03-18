const isHexColor = require('validator/lib/isHexColor').default;

module.exports = async function hexColor(field, value) {
    return isHexColor(value);
};
