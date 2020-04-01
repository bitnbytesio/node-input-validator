"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable eqeqeq */
var empty = require('../lib/empty');

var _require = require('../lib/ObjectIndex'),
    pathIndex = _require.pathIndex;

module.exports = /*#__PURE__*/function () {
  var _requiredIf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var required, start, requiredField, requiredValue;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!args || args.length < 2)) {
              _context.next = 2;
              break;
            }

            throw new Error("Invalid arguments supplied for field ".concat(field, " in requiredIf rule."));

          case 2:
            if (!(args.length % 2 !== 0)) {
              _context.next = 4;
              break;
            }

            throw new Error("Invalid arguments supplied for field ".concat(field, " in requiredIf rule."));

          case 4:
            required = false;
            start = 0;

          case 6:
            if (!(start < args.length)) {
              _context.next = 20;
              break;
            }

            requiredField = args[start];
            requiredValue = args[start + 1];

            if (!(requiredField == field)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", false);

          case 11:
            if (!(!empty(pathIndex(this.inputs, requiredField)) // @ts-ignore
            && pathIndex(this.inputs, requiredField).toString() == requiredValue)) {
              _context.next = 15;
              break;
            }

            required = true;
            _context.next = 17;
            break;

          case 15:
            required = false;
            return _context.abrupt("break", 20);

          case 17:
            start += 2;
            _context.next = 6;
            break;

          case 20:
            if (!(required && empty(value))) {
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
    }, _callee, this);
  }));

  function requiredIf(_x, _x2, _x3) {
    return _requiredIf.apply(this, arguments);
  }

  return requiredIf;
}();