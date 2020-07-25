"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accepted = void 0;
function accepted(args = ["true", "1", "yes", "on"]) {
    return {
        name: "accepted",
        handler: (value) => {
            if (args.indexOf(String(value)) >= 0) {
                return true;
            }
            return false;
        },
    };
}
exports.accepted = accepted;
//# sourceMappingURL=accepted.rule.js.map