export abstract class DateAdapter {

  // https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  // readonly FORMAT_yyyy_MM_dd: string = 'yyyy-MM-dd';

  readonly FORMAT_DATE: string = 'yyyy-MM-dd';
  readonly FORMAT_DATETIME: string = 'yyyy-MM-dd HH:mm:ss';

  constructor(protected dateLib: any) { }

  abstract isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;
  abstract isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;

  abstract addDays(date: Date, days: number): Date;
  abstract subDays(date: Date, days: number): Date;
  abstract parse(date: string, format: string, referenceDate?: Date): Date;
  abstract format(date: Date, format: string): string;
  abstract isValidDateFormat(date: string, format: string): boolean
  abstract isValidIsoDateFormat(date: string): boolean
}
