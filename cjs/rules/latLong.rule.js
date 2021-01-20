"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latLong = void 0;
const validator_1 = __importDefault(require("validator"));
function latLong() {
    return {
        name: "latLong",
        handler: (value) => {
            return validator_1.default.isLatLong(String(value));
        },
    };
}
exports.latLong = latLong;
//# sourceMappingURL=latLong.rule.js.map