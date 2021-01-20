import validator from 'validator';
export function mongoId() {
    return {
        name: "mongoId",
        handler: (value) => {
            return validator.isMongoId(String(value));
        },
    };
}
//# sourceMappingURL=mongoId.rule.js.map