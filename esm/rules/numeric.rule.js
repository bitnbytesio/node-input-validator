import validator from 'validator';
export function numeric() {
    return {
        name: "numeric",
        handler: (value) => {
            return validator.isNumeric(String(value));
        },
    };
}
//# sourceMappingURL=numeric.rule.js.map