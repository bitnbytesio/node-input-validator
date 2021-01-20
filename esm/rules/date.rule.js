import { dateAdapter } from "../date";
export function dateAfter(args) {
    if (args.length !== 2) {
        throw new Error('Rule accepts 2 argument (format,date).');
    }
    const adapter = dateAdapter();
    const [format, dateToCompare] = args;
    if (typeof format !== 'string') {
        throw new TypeError('First element must be date format.');
    }
    return {
        name: "dateAfter",
        handler: (value) => {
            return adapter.isAfter(format, value, dateToCompare);
        },
    };
}
export function dateAfterToday(args) {
    if (args.length !== 1) {
        throw new Error('Rule accepts only 1 argument (format).');
    }
    const adapter = dateAdapter();
    const [format] = args;
    return {
        name: "dateAfterToday",
        handler: (value) => {
            return adapter.isAfter(format, value, new Date);
        },
    };
}
export function dateBefore(args) {
    if (args.length !== 2) {
        throw new Error('Rule accepts 2 argument (format,date).');
    }
    const adapter = dateAdapter();
    const [format, dateToCompare] = args;
    if (typeof format !== 'string') {
        throw new TypeError('First element must be date format.');
    }
    return {
        name: "dateBefore",
        handler: (value) => {
            return adapter.isBefore(format, value, dateToCompare);
        },
    };
}
export function dateBeforeToday(args) {
    if (args.length !== 1) {
        throw new Error('Rule accepts only 1 argument (format).');
    }
    const adapter = dateAdapter();
    const [format] = args;
    return {
        name: "dateBeforeToday",
        handler: (value) => {
            return adapter.isBefore(format, value, new Date);
        },
    };
}
export function dateFormat(args) {
    if (args.length !== 1) {
        throw new Error('Rule accepts only 1 argument (format).');
    }
    const adapter = dateAdapter();
    const [format] = args;
    return {
        name: "dateFormat",
        handler: (value) => {
            return adapter.isValidDateFormat(value, format);
        },
    };
}
export function dateISO() {
    const adapter = dateAdapter();
    return {
        name: "dateISO",
        handler: (value) => {
            return adapter.isValidIsoDateFormat(value);
        },
    };
}
//# sourceMappingURL=date.rule.js.map