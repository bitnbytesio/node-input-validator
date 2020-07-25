"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayUniqueObjects = exports.arrayUnique = exports.array = void 0;
function array() {
    return {
        name: "array",
        handler: (value) => {
            return Array.isArray(value);
        },
    };
}
exports.array = array;
function arrayUnique() {
    return {
        name: "arrayUnique",
        handler: (value) => {
            if (!Array.isArray(value)) {
                return false;
            }
            return (new Set(value)).size === value.length;
        },
    };
}
exports.arrayUnique = arrayUnique;
function arrayUniqueObjects(args) {
    return {
        name: "arrayUniqueObjects",
        handler: (value) => {
            if (!Array.isArray(value)) {
                return false;
            }
            const result = new Set(value.map((o) => {
                let output = "";
                for (const attr of args) {
                    output += o[attr];
                }
                return output;
            }));
            return result.size === value.length;
        },
    };
}
exports.arrayUniqueObjects = arrayUniqueObjects;
//# sourceMappingURL=array.rule.js.map