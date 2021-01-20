import validator from 'validator';
export function before(args = []) {
    const date = args[0] || undefined;
    return {
        name: "before",
        handler: (value) => {
            return validator.isBefore(String(value), date);
        },
    };
}
//# sourceMappingURL=before.rule.js.map