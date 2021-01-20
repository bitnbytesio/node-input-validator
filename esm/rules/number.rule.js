import validator from 'validator';
export function integer() {
    return {
        name: "integer",
        handler: (value) => {
            return validator.isInt(String(value));
        },
    };
}
export function min(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const minNum = Number(args[0]);
    if (isNaN(minNum)) {
        throw new TypeError('Seed must be number.');
    }
    return {
        name: "min",
        handler: (value) => {
            const v = String(value);
            if (!validator.isNumeric(v)
                || Number(v) < minNum) {
                return false;
            }
            return true;
        },
    };
}
export function max(args) {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments.');
    }
    const maxNum = Number(args[0]);
    if (isNaN(maxNum)) {
        throw new TypeError('Seed must be number.');
    }
    return {
        name: "max",
        handler: (value) => {
            const v = String(value);
            if (!validator.isNumeric(v)
                || Number(v) > maxNum) {
                return false;
            }
            return true;
        },
    };
}
export function decimal() {
    return {
        name: "decimal",
        handler: (value) => {
            return validator.isDecimal(String(value));
        },
    };
}
export function numeric() {
    return {
        name: "numeric",
        handler: (value) => {
            return validator.isNumeric(String(value));
        },
    };
}
//# sourceMappingURL=number.rule.js.map