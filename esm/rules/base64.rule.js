import validator from 'validator';
export function base64() {
    return {
        name: "base64",
        handler: (value) => {
            return validator.isBase64(String(value));
        },
    };
}
//# sourceMappingURL=base64.rule.js.map