import { DateAdapter } from "./contracts.js";

export class DateFnsAdapter extends DateAdapter {
  protected dateLib: any;
  readonly FORMAT_DATE: string = 'yyyy-MM-dd';
  readonly FORMAT_DATETIME: string = 'yyyy-MM-dd HH:mm:ss';

  constructor(dateLib: any) {
    super(dateLib);
  }

  isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean {
    date = this.parseDate(date, format)

    dateToCompare = this.parseDate(dateToCompare, format)

    return this.dateLib.isAfter(date, dateToCompare);
  }

  isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean {
    date = this.parseDate(date, format)

    dateToCompare = this.parseDate(dateToCompare, format)

    return this.dateLib.isBefore(date, dateToCompare);
  }

  addDays(date: Date, days: number): Date {
    return this.dateLib.addDays(date, days);
  }

  subDays(date: Date, days: number): Date {
    return this.dateLib.subDays(date, days);
  }

  parseDate(date: Date | string | number, format: string): Date {
    const parsed: Date = date instanceof Date
      ? new Date(date.getTime())
      : this.dateLib.parse(date, format, new Date);

    parsed.setHours(0);
    parsed.setMinutes(0);
    parsed.setSeconds(0);
    parsed.setMilliseconds(0);
    return parsed;
  }

  parse(date: string, format: string, referenceDate: Date): Date {
    return this.dateLib.parse(date, format, referenceDate);
  }

  isValidDateFormat(date: string, format: string): boolean {
    return this.dateLib.isValid(this.parse(date, format, new Date))
  }

  isValidIsoDateFormat(date: string): boolean {
    return this.dateLib.isValid(this.dateLib.parseISO(date));
  }

  format(date: Date, format: string): string {
    return this.dateLib.format(date, format);
  }
}
