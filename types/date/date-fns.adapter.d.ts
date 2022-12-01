import { DateAdapter } from "./contracts.js";
export declare class DateFnsAdapter extends DateAdapter {
    protected dateLib: any;
    readonly FORMAT_DATE: string;
    readonly FORMAT_DATETIME: string;
    constructor(dateLib: any);
    isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;
    isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;
    addDays(date: Date, days: number): Date;
    subDays(date: Date, days: number): Date;
    parseDate(date: Date | string | number, format: string): Date;
    parse(date: string, format: string, referenceDate: Date): Date;
    isValidDateFormat(date: string, format: string): boolean;
    isValidIsoDateFormat(date: string): boolean;
    format(date: Date, format: string): string;
}
