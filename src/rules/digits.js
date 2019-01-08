const v = require('validator'),
    numeric = require('./numeric');

module.exports = async function digits(field, value, dNumber) {

    if (!numeric(field)) {
        return false;
    }

    if (dNumber != value.length) {
        return false;
    }

    return true;

}