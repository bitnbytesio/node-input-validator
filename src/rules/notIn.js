/* eslint-disable no-unused-vars */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */

const _in = require('./in');

module.exports = async function notIn(field, value, args) {
    return !(await _in(...arguments));
};
