const v = require('validator');

module.exports = async function contains(field, value, inString) {

    if (typeof inString !== 'string') {

        throw new Error('Seed in contains must be string.');
    }

    if (!v.contains(value, inString)) {

        return false;
    }

    return true;

}