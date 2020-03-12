const isMongoId = require('validator/lib/isMongoId').default;

module.exports = async function mongoId(field, value) {
    return isMongoId(value);
};
