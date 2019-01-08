const empty = require('../lib/empty');

module.exports = async function nullable(field, value) {

    if (field in this.inputs && value === null || !empty(value)) {
        return true;
    }

    return false;
}
