const v = require('validator');

module.exports = async function json(field, value) {

    if (!v.isJSON(value)) {

        return false;
    }

    return true;

}