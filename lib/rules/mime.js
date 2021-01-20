/* eslint-disable no-console */
const mime = require('mime-types');
const fileType = require('file-type');
const readChunk = require('read-chunk');

module.exports = async function validateMime({ value, args }) {
  const file = value;

  let success = true;

  let mtype;

  if (file.mime) {
    mtype = file.mime;
  } else if (file.type) {
    mtype = file.type;
  } else if (file.mimetype) {
    mtype = file.mimetype;
  } else if (file instanceof Buffer) {
    try {
      mtype = (await fileType.fromBuffer(file)).mime;
    } catch (e) {
      /* istanbul ignore next */
      console.error(e);
    }
  } else if (file.buffer && file.buffer instanceof Buffer) {
    try {
      mtype = (await fileType.fromBuffer(file.buffer)).mime;
    } catch (e) {
      /* istanbul ignore next */
      console.error(e);
    }
  } else if (typeof file === 'string') {
    try {
      const buffer = await readChunk(file, 0, 4100);
      mtype = (await fileType.fromBuffer(buffer)).mime;
    } catch (e) {
      /* istanbul ignore next */
      console.error(e);
    }
  } else if (file.path && typeof file.path === 'string') {
    try {
      const buffer = await readChunk(file.path, 0, 4100);
      mtype = (await fileType.fromBuffer(buffer)).mime;
    } catch (e) {
      /* istanbul ignore next */
      console.error(e);
    }
  } else {
    throw new Error('MIME rule only accepts Buffer,file path or type/mime property in file object.');
  }

  for (let i = 0; i < args.length; ++i) {
    if (mime.lookup(args[i]) !== mtype) {
      success = false;
    } else {
      success = true;
      break;
    }
  }
  // } else {
  //     if (mime.lookup(args) !== mtype) {
  //         success = false;
  //     }
  // }

  if (!success) {
    return false;
  }

  return true;
};
