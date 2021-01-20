import validator from 'validator';
export function url() {
    return {
        name: "url",
        handler: (value) => {
            return validator.isURL(value);
        },
    };
}
//# sourceMappingURL=url.rule.js.map