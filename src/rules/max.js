const numeric = require('./numeric');

module.exports = async function max(field, value, maxNum) {

    if (!numeric(field, maxNum)) {
        return false;
    }

    if (Number(value) > Number(maxNum)) {
        return false;
    }

    return true;
}