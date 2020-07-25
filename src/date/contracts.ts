import { string } from "../rules"

export interface DateFormats {
  yyyy_MM_dd: string
}

export abstract class DateAdapter {

  // https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  static FORMAT_yyyy_MM_dd: string = 'yyyy-MM-dd';

  constructor(protected dateLib: any) { }

  abstract isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;
  abstract isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean;

  abstract addDays(date: Date, days: number): Date;
  abstract subDays(date: Date, days: number): Date;
  abstract parse(date: string, format: string): Date;
  abstract format(date: Date, format: string): string;
}
