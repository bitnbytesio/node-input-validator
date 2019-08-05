const mime = require('mime-types');
const fileType = require('file-type');
const readChunk = require('read-chunk');

module.exports = async function validateMime(field, file, args) {
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
      mtype = fileType(file).mime;
    } catch (e) {

    }
  } else if (file.buffer && file.buffer instanceof Buffer) {
    try {
      mtype = fileType(file.buffer).mime;
    } catch (e) {

    }
  } else if (typeof file === 'string') {
    try {
      const buffer = readChunk.sync(file, 0, 4100);
      mtype = fileType(buffer).mime;
    } catch (e) {

    }
  } else if (file.path && typeof file.path === 'string') {
    try {
      const buffer = readChunk.sync(file.path, 0, 4100);
      mtype = fileType(buffer).mime;
    } catch (e) {

    }
  } else {
    throw new Error('MIME rule only accepts Buffer,file path or type/mime property in file object.');
  }

  // if single arg, convert it to array
  if (!Array.isArray(args)) {
    args = [args];
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
