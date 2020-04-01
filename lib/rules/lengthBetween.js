"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable radix */
var integer = require('./integer');

module.exports = /*#__PURE__*/function () {
  var _lengthBetween = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(attribute, value, args) {
    var _args, min, max;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!Array.isArray(args) && args.length !== 2)) {
              _context.next = 2;
              break;
            }

            throw new Error("The number of arguments for length between in the field ".concat(attribute, " are invalid."));

          case 2:
            _args = (0, _slicedToArray2["default"])(args, 2), min = _args[0], max = _args[1];

            if (!(!integer(min.toString()) || !integer(max.toString()))) {
              _context.next = 5;
              break;
            }

            throw new Error('Seeds must be integer for lengthBetween rule.');

          case 5:
            min = parseInt(min);
            max = parseInt(max);

            if (!(min >= max)) {
              _context.next = 9;
              break;
            }

            throw new Error('Seed min must be less then max in lengthBetween.');

          case 9:
            if (!(typeof value === 'string' || Array.isArray(value))) {
              _context.next = 13;
              break;
            }

            if (!(value.length < min || value.length > max)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", false);

          case 12:
            return _context.abrupt("return", true);

          case 13:
            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function lengthBetween(_x, _x2, _x3) {
    return _lengthBetween.apply(this, arguments);
  }

  return lengthBetween;
}();