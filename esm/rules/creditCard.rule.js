import validator from 'validator';
export function creditCard() {
    return {
        name: "creditCard",
        handler: (value) => {
            return validator.isCreditCard(String(value));
        },
    };
}
//# sourceMappingURL=creditCard.rule.js.map