"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-unused-vars */

/* eslint-disable prefer-rest-params */

/* eslint-disable no-underscore-dangle */
var _in = require('./in');

module.exports = /*#__PURE__*/function () {
  var _notIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _in.apply(void 0, _args);

          case 2:
            return _context.abrupt("return", !_context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function notIn(_x, _x2, _x3) {
    return _notIn.apply(this, arguments);
  }

  return notIn;
}();