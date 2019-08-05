/**
 * return the value of the object for the given index
 * @param {any} object
 * @param {Number} index
 * @returns {boolean}
 */

// obj,'1.2.3' -> multiIndex(obj,['1','2','3'])

/**
 * get path index
 * @param {*} obj
 * @param {*} is
 * @return {*}
 */
function pathIndex(obj, is) {
  return multiIndex(obj, is.split('.'));
}

// obj,['1','2','3'] -> ((obj['1'])['2'])['3']
/**
 *
 * @param {*} obj
 * @param {*} is
 * @return {*}
 */
function multiIndex(obj, is) {
  return is.length ? multiIndex(obj[is[0]], is.slice(1)) : obj;
}

module.exports = {pathIndex, multiIndex};

