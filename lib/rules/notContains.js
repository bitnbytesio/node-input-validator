"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-unused-vars */

/* eslint-disable prefer-rest-params */
var contains = require('./contains');

module.exports = /*#__PURE__*/function () {
  var _notContains = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, inString) {
    var _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return contains.apply(void 0, _args);

          case 2:
            return _context.abrupt("return", !_context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function notContains(_x, _x2, _x3) {
    return _notContains.apply(this, arguments);
  }

  return notContains;
}();