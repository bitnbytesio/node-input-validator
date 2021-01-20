import validator from 'validator';
export function json() {
    return {
        name: "json",
        handler: (value) => {
            return validator.isJSON(String(value));
        },
    };
}
//# sourceMappingURL=json.rule.js.map