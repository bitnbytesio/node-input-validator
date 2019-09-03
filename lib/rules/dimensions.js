const sizeOf = require('image-size');
const namedArgs = require('../util/namedArgs');

module.exports = function dimensions({ value, args }) {
  const rules = namedArgs(args);

  let inputFile;

  if (typeof value === 'string' || value instanceof Buffer) {
    inputFile = value;
  } else if (value.path && typeof value.path === 'string') {
    inputFile = value.path;
  } else if (value.buffer && value.buffer instanceof Buffer) {
    inputFile = value.buffer;
  } else {
    throw new Error('Dimensions rule only accepts Buffer,file path or size property in file object.');
  }

  const imgDimensions = sizeOf(inputFile);

  if (rules.minWidth && Number(rules.minWidth) > imgDimensions.width) {
    return false;
  }
  if (rules.maxWidth && Number(rules.maxWidth) < imgDimensions.width) {
    return false;
  }

  // throw Number(rules.minHeight) < imgDimensions.height;
  if (rules.minHeight && Number(rules.minHeight) > imgDimensions.height) {
    return false;
  }

  if (rules.maxHeight && Number(rules.maxHeight) < imgDimensions.height) {
    return false;
  }

  if (rules.width && Number(rules.width) !== imgDimensions.width) {
    return false;
  }
  if (rules.height && Number(rules.height) !== imgDimensions.height) {
    return false;
  }

  return true;
};
