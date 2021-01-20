export interface DateFormats {
    yyyy_MM_dd: string;
}
export declare abstract class DateAdapter {
    protected dateLib: any;
    static FORMAT_yyyy_MM_dd: string;
    constructor(dateLib: any);
    abstract isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;
    abstract isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;
    abstract addDays(date: Date, days: number): Date;
    abstract subDays(date: Date, days: number): Date;
    abstract parse(date: string, format: string, referenceDate: Date): Date;
    abstract format(date: Date, format: string): string;
    abstract isValidDateFormat(date: string, format: string): boolean;
    abstract isValidIsoDateFormat(date: string): boolean;
}
