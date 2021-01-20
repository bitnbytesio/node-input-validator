import validator from 'validator';
export function integer() {
    return {
        name: "integer",
        handler: (value) => {
            return validator.isInt(String(value));
        },
    };
}
//# sourceMappingURL=integer.rule.js.map