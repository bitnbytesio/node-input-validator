const isISO8601 = require('validator/lib/isISO8601').default;

module.exports = async function iso8601(field, value) {
    return isISO8601(value);
};
