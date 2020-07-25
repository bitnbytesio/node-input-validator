import { DateAdapter } from "./contracts";

export class DateFnsAdapter extends DateAdapter {
  protected dateLib: any;
  static FORMAT_yyyy_MM_dd: string = 'yyyy-MM-dd';

  constructor(dateLib: any) {
    super(dateLib);
  }

  isAfter(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean {
    if (typeof date === 'string') {
      date = this.parse(date, format)
    }

    if (typeof dateToCompare === 'string') {
      dateToCompare = this.parse(dateToCompare, format)
    }

    return this.dateLib.isAfter(date, dateToCompare);
  }

  isBefore(format: string, date: Date | number | string, dateToCompare: Date | number | string): boolean {
    if (typeof date === 'string') {
      date = this.parse(date, format)
    }

    if (typeof dateToCompare === 'string') {
      dateToCompare = this.parse(dateToCompare, format)
    }

    return this.dateLib.isBefore(date, dateToCompare);
  }

  addDays(date: Date, days: number): Date {
    return this.dateLib.addDays(date, days);
  }

  subDays(date: Date, days: number): Date {
    return this.dateLib.subDays(date, days);
  }

  parse(date: string, format: string): Date {
    return this.dateLib.parse(date, format, new Date);
  }

  format(date: Date, format: string): string {
    return this.dateLib.format(date, format);
  }
}
