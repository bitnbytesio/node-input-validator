"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateISO = exports.dateFormat = exports.dateBeforeToday = exports.dateBefore = exports.dateAfterToday = exports.dateAfter = void 0;
const date_1 = require("../date");
function dateAfter(args) {
    if (args.length !== 2) {
        throw new Error('Rule accepts 2 argument (format,date).');
    }
    const adapter = date_1.dateAdapter();
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
exports.dateAfter = dateAfter;
function dateAfterToday(args) {
    if (args.length !== 1) {
        throw new Error('Rule accepts only 1 argument (format).');
    }
    const adapter = date_1.dateAdapter();
    const [format] = args;
    return {
        name: "dateAfterToday",
        handler: (value) => {
            return adapter.isAfter(format, value, new Date);
        },
    };
}
exports.dateAfterToday = dateAfterToday;
function dateBefore(args) {
    if (args.length !== 2) {
        throw new Error('Rule accepts 2 argument (format,date).');
    }
    const adapter = date_1.dateAdapter();
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
exports.dateBefore = dateBefore;
function dateBeforeToday(args) {
    if (args.length !== 1) {
        throw new Error('Rule accepts only 1 argument (format).');
    }
    const adapter = date_1.dateAdapter();
    const [format] = args;
    return {
        name: "dateBeforeToday",
        handler: (value) => {
            return adapter.isBefore(format, value, new Date);
        },
    };
}
exports.dateBeforeToday = dateBeforeToday;
function dateFormat(args) {
    if (args.length !== 1) {
        throw new Error('Rule accepts only 1 argument (format).');
    }
    const adapter = date_1.dateAdapter();
    const [format] = args;
    return {
        name: "dateFormat",
        handler: (value) => {
            return adapter.isValidDateFormat(value, format);
        },
    };
}
exports.dateFormat = dateFormat;
function dateISO() {
    const adapter = date_1.dateAdapter();
    return {
        name: "dateISO",
        handler: (value) => {
            return adapter.isValidIsoDateFormat(value);
        },
    };
}
exports.dateISO = dateISO;
//# sourceMappingURL=date.rule.js.map