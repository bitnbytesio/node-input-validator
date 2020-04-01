"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable radix */
var numeric = require('./numeric');

var integer = require('./integer');

module.exports = /*#__PURE__*/function () {
  var _digitsBetween = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var _args, min, max;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return numeric(field, value);

          case 2:
            if (_context.sent) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", false);

          case 4:
            if (!(!Array.isArray(args) && args.length !== 2)) {
              _context.next = 6;
              break;
            }

            throw new Error("The number of arguments for digits between in the field ".concat(field, " are invalid."));

          case 6:
            _args = (0, _slicedToArray2["default"])(args, 2), min = _args[0], max = _args[1];
            _context.next = 9;
            return integer(field, min);

          case 9:
            _context.t0 = !_context.sent;

            if (_context.t0) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return integer(field, max);

          case 13:
            _context.t0 = !_context.sent;

          case 14:
            if (!_context.t0) {
              _context.next = 16;
              break;
            }

            throw new Error('Seeds must be integer for digits between rule.');

          case 16:
            min = parseInt(min);
            max = parseInt(max);

            if (!(min >= max)) {
              _context.next = 20;
              break;
            }

            throw new Error('Seed min must be less then max in digits between.');

          case 20:
            if (!(value.length < min || value.length > max)) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", false);

          case 22:
            return _context.abrupt("return", true);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function digitsBetween(_x, _x2, _x3) {
    return _digitsBetween.apply(this, arguments);
  }

  return digitsBetween;
}();