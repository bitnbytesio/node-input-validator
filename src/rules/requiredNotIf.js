const requiredIf = require('./requiredIf');

module.exports = async function requiredNotIf(field, value, args) {
    return !(await requiredIf.apply(this, arguments));
}