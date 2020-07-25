"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValuesByWildCardStringNotation = exports.isIterable = exports.getValueByStringNotation = exports.namedArgs = exports.getKeyValue = void 0;
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
    const { prefix, iterations, seperator } = Object.assign({ prefix: [], iterations: 10000, seperator: "." }, options);
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