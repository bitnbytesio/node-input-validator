import validator from 'validator';
export function after(args = []) {
    const date = args[0] || undefined;
    return {
        name: "after",
        handler: (value) => {
            return validator.isAfter(String(value), date);
        },
    };
}
//# sourceMappingURL=after.rule.js.map