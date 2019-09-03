/**
 * convert size into bytes
 * @param {string} inputSize
 * @return {Number}
 */
module.exports = function sizeToBytes(inputSize) {
  const size = inputSize.toString().toLowerCase();

  /* istanbul ignore next */
  if (size.includes('gb') || size.includes('g')) {
    return parseInt(size.replace('gb', '').replace('g', '')) * 1024 * 1024 * 1024;
  }

  /* istanbul ignore next */
  if (size.includes('mb') || size.includes('m')) {
    return parseInt(size.replace('mb', '').replace('m', '')) * 1024 * 1024;
  }

  /* istanbul ignore next */
  if (size.includes('kb') || size.includes('k')) {
    return parseInt(size.replace('kb', '').replace('k', '')) * 1024;
  }

  /* istanbul ignore next */
  if (size.includes('b')) {
    return parseInt(size.replace('b', ''));
  }

  /* istanbul ignore next */
  return parseInt(size) * 1024;
};
