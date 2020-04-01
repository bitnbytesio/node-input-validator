"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// @ts-nocheck
var empty = require('../lib/empty');

module.exports = /*#__PURE__*/function () {
  var _sometimes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (field in this.inputs) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", true);

          case 2:
            if (!empty(value)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", false);

          case 4:
            return _context.abrupt("return", true);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function sometimes(_x, _x2) {
    return _sometimes.apply(this, arguments);
  }

  return sometimes;
}();