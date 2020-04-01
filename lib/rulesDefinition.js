"use strict";

/* eslint-disable no-restricted-syntax */
var _require = require('./definitions'),
    rules = _require.rules,
    types = _require.types;

function definitions() {
  var ruleDefinitions = {};

  var _loop = function _loop() {
    var type = _Object$values[_i];
    ruleDefinitions[type] = rules.filter(function (r) {
      return r.types.find(function (t) {
        return t === type;
      });
    });
  };

  for (var _i = 0, _Object$values = Object.values(types); _i < _Object$values.length; _i++) {
    _loop();
  }

  return ruleDefinitions;
}

module.exports = definitions();