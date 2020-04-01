"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable prefer-const */
// @ts-ignore
var moment = require('moment');

var _require = require('../lib/date'),
    dateFormats = _require.dateFormats;

module.exports = /*#__PURE__*/function () {
  var _validateBefore = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, beforeDate) {
    var mBeforeDate, mDate;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mBeforeDate = moment(beforeDate, dateFormats);
            mDate = moment(value, dateFormats);
            /* istanbul ignore next */

            if (!(!mBeforeDate.isValid() || !mDate.isValid() || mBeforeDate.valueOf() < mDate.valueOf())) {
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
    }, _callee);
  }));

  function validateBefore(_x, _x2, _x3) {
    return _validateBefore.apply(this, arguments);
  }

  return validateBefore;
}();