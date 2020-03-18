/* eslint-disable no-restricted-globals */
module.exports = async function numeric(field, value) {
    return !isNaN(value) && isFinite(value);
};
