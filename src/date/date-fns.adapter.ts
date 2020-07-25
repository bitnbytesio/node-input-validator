import { DateAdapter } from "./contracts";

export class DateFnsAdapter extends DateAdapter {
  protected dateLib: any;
  static FORMAT_yyyy_MM_dd: string = 'yyyy-MM-dd';

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
    if (!(date instanceof Date)) {
      date = this.dateLib.parse(date, format, new Date);
    }

    // @ts-ignore
    let d: Date = date;

    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
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
