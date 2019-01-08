const empty = require('../lib/empty');

module.exports = async function required(field, value) {

    if (empty(value)) {
        return false;
    }

    return true;
}

