// obj,'1.2.3' -> multiIndex(obj,['1','2','3'])

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

/**
 * get path index
 * @param {*} obj
 * @param {*} is
 * @return {*}
 */
function pathIndex(obj, is) {
  return multiIndex(obj, is.split('.'));
}

module.exports = { pathIndex, multiIndex };
