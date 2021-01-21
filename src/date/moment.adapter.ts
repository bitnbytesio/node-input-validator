import { DateAdapter } from "./contracts";

export class MomentAdapter extends DateAdapter {
  protected dateLib: any;
  readonly FORMAT_DATE: string = 'YYYY-MM-DD';
  readonly FORMAT_DATETIME: string = 'YYYY-MM-DD HH:mm:ss';

  constructor(dateLib: any) {
    super(dateLib);
  }

  isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean {
    return this.dateLib(date, format).isAfter(this.format(dateToCompare, format));
  }

  isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean {
    return this.dateLib(date, format).isBefore(this.format(dateToCompare, format));
  }

  addDays(date: Date, days: number): Date {
    return this.dateLib(date).add(days, 'days').toDate();
  }

  subDays(date: Date, days: number): Date {
    return this.dateLib(date).subtract(days, 'days').toDate();
  }

  parseDate(date: Date | string | number, format: string): Date {
    return this.dateLib(date, format).set({
      h: 0,
      m: 0,
      s: 0,
      ms: 0,
    }).toDate();
  }

  parse(date: string, format: string, referenceDate: Date): Date {
    return this.dateLib(date, format).toDate();
  }

  isValidDateFormat(date: string, format: string): boolean {
    return this.dateLib(date, format, true).isValid()
  }

  isValidIsoDateFormat(date: string): boolean {
    return this.dateLib(date, this.dateLib.ISO_8601).isValid();
  }

  format(date: any, format: string): string {
    return this.dateLib(date).format(format);
  }
}
