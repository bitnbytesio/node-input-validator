const isJSON = require('validator/lib/isJSON').default;

module.exports = async function json(field, value) {
    if (!isJSON(value)) {
        return false;
    }

    return true;
};
