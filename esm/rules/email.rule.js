import validator from 'validator';
export function email() {
    return {
        name: "email",
        handler: (value) => {
            return validator.isEmail(String(value));
        },
    };
}
//# sourceMappingURL=email.rule.js.map