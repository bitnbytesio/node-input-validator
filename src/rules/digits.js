const v = require('validator'),
    numeric = require('./numeric');

module.exports = async function digits(field, value, dNumber) {

    if (!(await numeric(field, dNumber))) {
        throw `Please provide a numeric value for ${field} under digits rule.`;
    }

    if (dNumber != value.length) {
        return false;
    }

    return true;

}