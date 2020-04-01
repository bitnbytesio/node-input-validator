"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var empty = require('../lib/empty');

var _require = require('../lib/ObjectIndex'),
    pathIndex = _require.pathIndex;

module.exports = /*#__PURE__*/function () {
  var _acceptedIf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(field, value, args) {
    var acceptedValues, canbetrue, start, requiredField, requiredValue;
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
            acceptedValues = [true, 'true', 1, '1', 'yes', 'on'];
            canbetrue = false;
            start = 0;

          case 7:
            if (!(start < args.length)) {
              _context.next = 21;
              break;
            }

            requiredField = args[start];
            requiredValue = args[start + 1];

            if (!(requiredField === field)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", false);

          case 12:
            if (!(!empty(pathIndex(this.inputs, requiredField)) // @ts-ignore
            && pathIndex(this.inputs, requiredField).toString() === requiredValue)) {
              _context.next = 16;
              break;
            }

            canbetrue = true;
            _context.next = 18;
            break;

          case 16:
            canbetrue = false;
            return _context.abrupt("break", 21);

          case 18:
            start += 2;
            _context.next = 7;
            break;

          case 21:
            if (!(canbetrue && !(acceptedValues.indexOf(value) >= 0))) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", false);

          case 23:
            return _context.abrupt("return", true);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function acceptedIf(_x, _x2, _x3) {
    return _acceptedIf.apply(this, arguments);
  }

  return acceptedIf;
}();