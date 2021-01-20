"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iso8601 = exports.dateiso = void 0;
const validator_1 = __importDefault(require("validator"));
function dateiso() {
    return {
        name: "dateiso",
        handler: (value) => {
            return validator_1.default.isISO8601(String(value));
        },
    };
}
exports.dateiso = dateiso;
function iso8601() {
    return dateiso();
}
exports.iso8601 = iso8601;
//# sourceMappingURL=dateiso.rule.js.map