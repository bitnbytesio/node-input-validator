"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayLenMax = exports.arrayLenMin = exports.arrayLenRange = exports.arrayLen = exports.arrayUniqueObjects = exports.arrayUnique = exports.array = void 0;
// This file is the perfect example of when to place multiple rules in same file.
// All rules in this file have common check ie. isArray and on top of that 
// 2 of them have unique check.
/**
 * The field under validation must be array.
 */
function array() {
    return {
        name: "array",
        handler: (value) => {
            return Array.isArray(value);
        },
    };
}
exports.array = array;
/**
 * The field under validation must be array of unique values.
 * No need to use array rule. This rule will take care of that.
 */
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
/**
 * The field under validation must be array and should have objects with unique attributes as per seed.
 * No need to use array rule. This rule will take care of that.
 * @param args seeds
 */
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
/**
 * @since: v5
 * The field under validation must be array of length as per seed.
 * @param args seeds
 */
function arrayLen(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const len = parseInt(args[0], 10);
    return {
        name: "arrayLen",
        handler: (value) => {
            return (Array.isArray(value) && value.length === len);
        },
    };
}
exports.arrayLen = arrayLen;
/**
 * @since: v5
 * The field under validation must be array and has length range as per seed.
 * @param args seeds
 */
function arrayLenRange(args) {
    if (args.length < 1 || args.length > 2) {
        throw new Error('Invalid number of arguments.');
    }
    const max = parseInt(args[0], 10);
    const min = parseInt(args[1] || '0', 10);
    return {
        name: "arrayLenRange",
        handler: (value) => {
            const len = value.length;
            return (Array.isArray(value) && len <= max && (!min || len >= min));
        },
    };
}
exports.arrayLenRange = arrayLenRange;
/**
 * @since: v5
 * The field under validation must be array and has minumun length as per seed.
 * @param args seeds
 */
function arrayLenMin(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const min = parseInt(args[0], 10);
    return {
        name: "arrayLenMin",
        handler: (value) => {
            const len = value.length;
            return (Array.isArray(value) && len >= min);
        },
    };
}
exports.arrayLenMin = arrayLenMin;
/**
 * @since: v5
 * The field under validation must be array and has maximum length as per seed.
 * @param args seeds
 */
function arrayLenMax(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const max = parseInt(args[0], 10);
    return {
        name: "arrayLenMax",
        handler: (value) => {
            const len = value.length;
            return (Array.isArray(value) && len <= max);
        },
    };
}
exports.arrayLenMax = arrayLenMax;
//# sourceMappingURL=array.rule.js.map