"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain = void 0;
const validator_1 = __importDefault(require("validator"));
function domain() {
    return {
        name: "domain",
        handler: (value) => {
            return validator_1.default.isFQDN(String(value));
        },
    };
}
exports.domain = domain;
//# sourceMappingURL=domain.rule.js.map