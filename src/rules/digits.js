const v = require('validator'),
    numeric = require('./numeric');

module.exports = async function digits(field, value, dNumber) {

    if (!numeric(field)) {
        throw `Please provide a numeric value for ${field} under digits rule`;
    }

    if (dNumber != value.length) {
        return false;
    }

    return true;

}