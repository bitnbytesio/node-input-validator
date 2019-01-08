const contains = require('./contains');

module.exports = async function notContains(field, value, inString) {
    return !(await contains(...arguments));
}