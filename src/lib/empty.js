/**
 * check if given value is empty or not
 * @param {string} value
 * @returns {boolean}
 */
module.exports = function empty(value) {

    // this will check: null,undefined,NaN, string "", 0, false  
    if (!value) {
        return true;
    }

    return !value.toString().trim();

}