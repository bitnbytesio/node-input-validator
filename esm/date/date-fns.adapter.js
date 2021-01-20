import { DateAdapter } from "./contracts";
export class DateFnsAdapter extends DateAdapter {
    constructor(dateLib) {
        super(dateLib);
    }
    isAfter(format, date, dateToCompare) {
        date = this.parseDate(date, format);
        dateToCompare = this.parseDate(dateToCompare, format);
        return this.dateLib.isAfter(date, dateToCompare);
    }
    isBefore(format, date, dateToCompare) {
        date = this.parseDate(date, format);
        dateToCompare = this.parseDate(dateToCompare, format);
        return this.dateLib.isBefore(date, dateToCompare);
    }
    addDays(date, days) {
        return this.dateLib.addDays(date, days);
    }
    subDays(date, days) {
        return this.dateLib.subDays(date, days);
    }
    parseDate(date, format) {
        if (!(date instanceof Date)) {
            date = this.dateLib.parse(date, format, new Date);
        }
        // @ts-ignore
        let d = date;
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }
    parse(date, format, referenceDate) {
        return this.dateLib.parse(date, format, referenceDate);
    }
    isValidDateFormat(date, format) {
        return this.dateLib.isValid(this.parse(date, format, new Date));
    }
    isValidIsoDateFormat(date) {
        return this.dateLib.isValid(this.dateLib.parseISO(date));
    }
    format(date, format) {
        return this.dateLib.format(date, format);
    }
}
DateFnsAdapter.FORMAT_yyyy_MM_dd = 'yyyy-MM-dd';
//# sourceMappingURL=date-fns.adapter.js.map