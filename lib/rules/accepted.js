"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-param-reassign */
module.exports = /*#__PURE__*/function () {
  var _accepted = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!args) {
              args = [true, 'true', 1, '1', 'yes', 'on'];
            }

            if (!(args.indexOf(value) >= 0)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", true);

          case 3:
            return _context.abrupt("return", false);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function accepted(_x, _x2, _x3) {
    return _accepted.apply(this, arguments);
  }

  return accepted;
}();