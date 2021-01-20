import * as config from '../config';
export function getKeyValue(key) {
    return (obj) => obj[key];
}
export function namedArgs(params) {
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
export function getValueByStringNotation(object, notation) {
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
export function isIterable(object) {
    return object != null &&
        (typeof object === "object" || Array.isArray(object));
}
export function getValuesByWildCardStringNotation(iterable, options = {}) {
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
//# sourceMappingURL=obj.util.js.map