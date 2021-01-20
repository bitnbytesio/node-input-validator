import validator from 'validator';
/**
 * The field under validation must be entirely alphabetic characters.
 */
export function alpha() {
    return {
        name: "alpha",
        handler: (value) => {
            return validator.isAlpha(value + "");
        },
    };
}
/**
 * The field under validation may have alpha characters, as well as hyphens and underscores.
 */
export function alphaDash() {
    return {
        name: "alphaDash",
        handler: (value) => {
            if (!(/^[A-Z_-]+$/i.test(value + ""))) {
                return false;
            }
            return true;
        },
    };
}
/**
 * The field under validation may have alpha characters, as well as hyphens.
 */
export function alphaHyphen() {
    return {
        name: "alphaHyphen",
        handler: (value) => {
            if (!(/^[A-Z-]+$/i.test(value + ""))) {
                return false;
            }
            return true;
        },
    };
}
/**
 * The field under validation must contains alpha-numeric characters.
 */
export function alphaNumeric() {
    return {
        name: "alphaNumeric",
        handler: (value) => {
            return validator.isAlphanumeric(value + "");
        },
    };
}
/**
 * The field under validation may have alpha-numeric characters, as well as hyphens and underscores.
 */
export function alphaNumericDash() {
    return {
        name: "alphaNumericDash",
        handler: (value) => {
            if (!(/^[A-Z0-9_-]+$/i.test(value + ""))) {
                return false;
            }
            return true;
        },
    };
}
//# sourceMappingURL=alpha.rule.js.map