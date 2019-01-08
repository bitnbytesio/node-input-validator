const v = require('validator');

module.exports = async function base64(field, value) {

    if (v.isBase64(value)) {

        return true;
    }

    return false;

}