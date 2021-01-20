/* istanbul ignore file */
import validator from 'validator';
export function ascii() {
    return {
        name: "ascii",
        handler: (value) => {
            return validator.isAscii(String(value));
        },
    };
}
export function json() {
    return {
        name: "json",
        handler: (value) => {
            return validator.isJSON(String(value));
        },
    };
}
export function base64() {
    return {
        name: "base64",
        handler: (value) => {
            return validator.isBase64(String(value));
        },
    };
}
//# sourceMappingURL=encoding.rule.js.map