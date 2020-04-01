"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-plusplus */

/* eslint-disable no-empty */
var mime = require('mime-types'); // @ts-ignore


var fileType = require('file-type'); // @ts-ignore


var readChunk = require('read-chunk'); // @ts-ignore


module.exports = /*#__PURE__*/function () {
  var _validateMime = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, file, args) {
    var success, mtype, buffer, _buffer, i;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            success = true;

            if (!file.mime) {
              _context.next = 5;
              break;
            }

            mtype = file.mime;
            _context.next = 30;
            break;

          case 5:
            if (!file.type) {
              _context.next = 9;
              break;
            }

            mtype = file.type;
            _context.next = 30;
            break;

          case 9:
            if (!file.mimetype) {
              _context.next = 13;
              break;
            }

            mtype = file.mimetype;
            _context.next = 30;
            break;

          case 13:
            if (!(file instanceof Buffer)) {
              _context.next = 17;
              break;
            }

            try {
              mtype = fileType(file).mime;
            } catch (e) {}

            _context.next = 30;
            break;

          case 17:
            if (!(file.buffer && file.buffer instanceof Buffer)) {
              _context.next = 21;
              break;
            }

            try {
              mtype = fileType(file.buffer).mime;
            } catch (e) {}

            _context.next = 30;
            break;

          case 21:
            if (!(typeof file === 'string')) {
              _context.next = 25;
              break;
            }

            try {
              buffer = readChunk.sync(file, 0, 4100);
              mtype = fileType(buffer).mime;
            } catch (e) {}

            _context.next = 30;
            break;

          case 25:
            if (!(file.path && typeof file.path === 'string')) {
              _context.next = 29;
              break;
            }

            try {
              _buffer = readChunk.sync(file.path, 0, 4100);
              mtype = fileType(_buffer).mime;
            } catch (e) {}

            _context.next = 30;
            break;

          case 29:
            throw new Error('MIME rule only accepts Buffer,file path or type/mime property in file object.');

          case 30:
            if (!Array.isArray(args)) {
              _context.next = 44;
              break;
            }

            i = 0;

          case 32:
            if (!(i < args.length)) {
              _context.next = 42;
              break;
            }

            if (!(mime.lookup(args[i]) !== mtype)) {
              _context.next = 37;
              break;
            }

            success = false;
            _context.next = 39;
            break;

          case 37:
            success = true;
            return _context.abrupt("break", 42);

          case 39:
            ++i;
            _context.next = 32;
            break;

          case 42:
            _context.next = 45;
            break;

          case 44:
            if (mime.lookup(args) !== mtype) {
              success = false;
            }

          case 45:
            if (success) {
              _context.next = 47;
              break;
            }

            return _context.abrupt("return", false);

          case 47:
            return _context.abrupt("return", true);

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function validateMime(_x, _x2, _x3) {
    return _validateMime.apply(this, arguments);
  }

  return validateMime;
}();