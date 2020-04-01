"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// @ts-ignore
var moment = require('moment');

module.exports = /*#__PURE__*/function () {
  var _yoBiggerThan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var now, birthday, diffInYears;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            now = moment();
            birthday = moment(value);
            diffInYears = now.diff(birthday, 'years');
            return _context.abrupt("return", diffInYears >= args);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function yoBiggerThan(_x, _x2, _x3) {
    return _yoBiggerThan.apply(this, arguments);
  }

  return yoBiggerThan;
}();