"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumber = void 0;
const validator_1 = __importDefault(require("validator"));
function phoneNumber() {
    return {
        name: "phoneNumber",
        handler: (value) => {
            return validator_1.default.isMobilePhone(String(value));
        },
    };
}
exports.phoneNumber = phoneNumber;
//# sourceMappingURL=phoneNumber.rule.js.map