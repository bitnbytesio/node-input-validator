const numeric = require('./numeric');

module.exports = async function digits(field, value, dNumber) {
    if (!numeric(field)) {
        // eslint-disable-next-line no-throw-literal
        throw `Please provide a numeric value for ${field} under digits rule`;
    }

    // eslint-disable-next-line eqeqeq
    if (dNumber != value.length) {
        return false;
    }

    return true;
};
