/* eslint-disable no-console */
const fs = require('fs');
const sizeToBytes = require('../util/sizeToBytes');

module.exports = function validateSize({ value, args }) {
  const file = value;

  let min; let size;

  const max = sizeToBytes(args[0]);
  if (args.length >= 2) {
    min = sizeToBytes(args[1]);
  }
  // } else {
  //     max = sizeToBytes(args);
  // }

  if (file.size) {
    size = file.size;
  } else if (typeof file === 'string') {
    try {
      size = fs.statSync(file).size;
    } catch (e) {
      /* istanbul ignore next */
      console.error(e);
    }
  } else if (file.path && typeof file.path === 'string') {
    try {
      size = fs.statSync(file.path).size;
    } catch (e) {
      /* istanbul ignore next */
      console.error(e);
    }
  } else if (file instanceof Buffer) {
    size = file.byteLength;
  } else if (file.buffer && file.buffer instanceof Buffer) {
    size = file.buffer.byteLength;
  } else {
    throw new Error('Size rule only accepts Buffer,file path or size property in file object.');
  }

  if (!max) {
    return false;
  }

  if (max && size >= max) {
    return false;
  }

  if (min && size <= min) {
    return false;
  }

  return true;
};
