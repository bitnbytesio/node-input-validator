const sizeOf = require('image-size');
const namedArgs = require('../lib/namedArgs');

module.exports = async function dimensions(field, file, args) {
  if (!Array.isArray(args)) {
    args = [args];
  }
  const rules = namedArgs(args);

  let inputFile;

  if (typeof file === 'string' || file instanceof Buffer) {
    inputFile = file;
  } else if (file.path && typeof file.path === 'string') {
    inputFile = file.path;
  } else if (file.buffer && file.buffer instanceof Buffer) {
    inputFile = file.buffer;
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
