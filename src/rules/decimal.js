const isDecimal = require('validator/lib/isDecimal').default;

module.exports = async function decimal(field, value) {
    return isDecimal(`${parseFloat(value)}`);
};
