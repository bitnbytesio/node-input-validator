import validator from 'validator';
export function decimal() {
    return {
        name: "decimal",
        handler: (value) => {
            return validator.isDecimal(String(value));
        },
    };
}
//# sourceMappingURL=decimal.rule.js.map