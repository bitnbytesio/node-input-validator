const IBAN = require('iban');

module.exports = async function iban(field, value) {
    if (!IBAN.isValid(value)) return false;
    return true;
};
