import validator from 'validator';
export function hex() {
    return {
        name: "hex",
        handler: (value) => {
            return validator.isHexadecimal(String(value));
        },
    };
}
export function hexColor() {
    return {
        name: "hexColor",
        handler: (value) => {
            return validator.isHexColor(String(value));
        },
    };
}
//# sourceMappingURL=hex.rule.js.map