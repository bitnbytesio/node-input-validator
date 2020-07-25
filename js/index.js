"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = void 0;
var validator_1 = require("./validator");
Object.defineProperty(exports, "Validator", { enumerable: true, get: function () { return validator_1.Validator; } });
exports.Messages = require("./messages");
exports.Rules = require("./rules");
function extend(ruleName, callback) {
    // @ts-ignore
    Rules[ruleName] = callback;
}
exports.extend = extend;
//# sourceMappingURL=index.js.map