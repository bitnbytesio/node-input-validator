const isURL = require('validator/lib/isURL').default;

module.exports = async function url(field, value) {
    return isURL(value);
};
