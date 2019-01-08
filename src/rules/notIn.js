
const _in = require('./in');

module.exports = async function notIn(field, value, args) {

    return !(await _in(...arguments));
}