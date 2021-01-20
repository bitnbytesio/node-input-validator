"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValuesByWildCardStringNotation = exports.isIterable = exports.getValueByStringNotation = exports.namedArgs = exports.getKeyValue = void 0;
const config = __importStar(require("../config"));
function getKeyValue(key) {
    return (obj) => obj[key];
}
exports.getKeyValue = getKeyValue;
function namedArgs(params) {
    const obj = {};
    if (!Array.isArray(params)) {
        return obj;
    }
    params.forEach((i) => {
        const [k, v] = i.split("=");
        if (v && v.length) {
            // @ts-ignore
            obj[k.trim()] = v.trim() || null;
        }
    });
    return obj;
}
exports.namedArgs = namedArgs;
function getValueByStringNotation(object, notation) {
    const notationArr = notation.split(".");
    let value;
    notationArr.map((item) => {
        if (value === undefined) {
            value = object[item];
        }
        else {
            value = value[item];
        }
        return value;
    });
    return value;
}
exports.getValueByStringNotation = getValueByStringNotation;
function isIterable(object) {
    return object != null &&
        (typeof object === "object" || Array.isArray(object));
}
exports.isIterable = isIterable;
function getValuesByWildCardStringNotation(iterable, options = {}) {
    const currentConfig = config.get();
    const { prefix, iterations, seperator } = Object.assign({ prefix: [], iterations: currentConfig.wildcardIterations, seperator: currentConfig.wildcardSeperator }, options);
    const notationsVals = {};
    const notationMap = {};
    let iterationsCount = 1;
    const parse = (data, prefix) => {
        iterationsCount++;
        if (iterationsCount > iterations) {
            // eslint-disable-next-line no-console
            throw new Error(`Max(${iterations}) repetation was reached.`);
        }
        Object.keys(data).forEach((key, index) => {
            const v = data[key];
            const notationKey = `${[...prefix, key].join(seperator)}`;
            const notationMapKey = notationKey.replace(/\.[0-9+]\./g, ".*.").replace(/^[0-9+]\./g, "*.");
            notationMap[notationMapKey] = notationMap[notationMapKey] || [];
            notationMap[notationMapKey].push(notationKey);
            if (isIterable(v)) {
                parse(v, [...prefix, key]);
                notationsVals[notationKey] = v;
            }
            else {
                notationsVals[notationKey] = v;
            }
        });
    };
    parse(iterable, [...prefix]);
    return { notationsVals, notationMap };
}
exports.getValuesByWildCardStringNotation = getValuesByWildCardStringNotation;
//# sourceMappingURL=obj.util.js.map