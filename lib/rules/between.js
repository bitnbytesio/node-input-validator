"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var numeric = require('./numeric');

module.exports = /*#__PURE__*/function () {
  var _between = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(attribute, value, args) {
    var _args, min, max;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!Array.isArray(args) && args.length !== 2)) {
              _context.next = 2;
              break;
            }

            throw new Error("The number of arguments for between in the field ".concat(attribute, " are invalid."));

          case 2:
            _args = (0, _slicedToArray2["default"])(args, 2), min = _args[0], max = _args[1];

            if (!(!numeric(min) || !numeric(max))) {
              _context.next = 5;
              break;
            }

            throw new Error('Seeds must be integer for between rule.');

          case 5:
            min = parseFloat(min);
            max = parseFloat(max);

            if (!(min >= max)) {
              _context.next = 9;
              break;
            }

            throw new Error('Seed min must be less then max in between.');

          case 9:
            if (!Array.isArray(value)) {
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
            if (!numeric(value)) {
              _context.next = 18;
              break;
            }

            // eslint-disable-next-line no-param-reassign
            value = Number(value);

            if (!(value < min || value > max)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", false);

          case 17:
            return _context.abrupt("return", true);

          case 18:
            return _context.abrupt("return", false);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function between(_x, _x2, _x3) {
    return _between.apply(this, arguments);
  }

  return between;
}();