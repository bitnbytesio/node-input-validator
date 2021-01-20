/* istanbul ignore file */
import validator from 'validator';
export function dateiso() {
    return {
        name: "dateiso",
        handler: (value) => {
            return validator.isISO8601(String(value));
        },
    };
}
export function iso8601() {
    return dateiso();
}
//# sourceMappingURL=dateiso.rule.js.map