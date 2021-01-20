import validator from 'validator';
export function ascii() {
    return {
        name: "ascii",
        handler: (value) => {
            return validator.isAscii(String(value));
        },
    };
}
//# sourceMappingURL=ascii.rule.js.map