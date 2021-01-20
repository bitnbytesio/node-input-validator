"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.macAddress = void 0;
const validator_1 = __importDefault(require("validator"));
function macAddress() {
    return {
        name: "macAddress",
        handler: (value) => {
            return validator_1.default.isMACAddress(String(value));
        },
    };
}
exports.macAddress = macAddress;
//# sourceMappingURL=macAddress.rule.js.map