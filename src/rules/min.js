const numeric = require('./numeric');

module.exports = async function min(field, value, minNum) {
    if (!numeric(minNum)) {
        throw new Error('Seed min is invalid.');
    }

    if (Number(value) < Number(minNum)) {
        return false;
    }

    return true;
}