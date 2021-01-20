import validator from 'validator';
export function phoneNumber() {
    return {
        name: "phoneNumber",
        handler: (value) => {
            return validator.isMobilePhone(String(value));
        },
    };
}
//# sourceMappingURL=phoneNumber.rule.js.map