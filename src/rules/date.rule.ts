import { ValidationRuleContract } from "../contracts";

import { dateAdapter } from "../date";
import { DateAdapter } from "../date/contracts";


export function dateAfter(args: Array<Date | string | number>): ValidationRuleContract {
  if (args.length !== 2) {
    throw new Error('Rule accepts 2 argument (format,date).');
  }

  const adapter: DateAdapter = dateAdapter();
  const [format, dateToCompare] = args;

  if (typeof format !== 'string') {
    throw new Error('First element must be date format.')
  }

  return {
    name: "dateAfter",
    handler: (value: any): boolean => {
      return adapter.isAfter(format, value, dateToCompare);
    },
  };
}

export function dateAfterToday(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Rule accepts only 1 argument (format).');
  }

  const adapter: DateAdapter = dateAdapter();
  const [format] = args;

  return {
    name: "dateAfterToday",
    handler: (value: any): boolean => {
      return adapter.isAfter(format, value, new Date);
    },
  };
}

export function dateBefore(
  args: Array<any>,
): ValidationRuleContract {
  if (args.length !== 2) {
    throw new Error('Rule accepts 2 argument (format,date).');
  }

  const adapter: DateAdapter = dateAdapter();
  const [format, dateToCompare] = args;

  if (typeof format !== 'string') {
    throw new Error('First element must be date format.')
  }

  return {
    name: "dateBefore",
    handler: (value: any) => {
      return adapter.isBefore(format, value, dateToCompare);
    },
  };
}


export function dateBeforeToday(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Rule accepts only 1 argument (format).');
  }

  const adapter: DateAdapter = dateAdapter();
  const [format] = args;

  return {
    name: "dateBeforeToday",
    handler: (value: any): boolean => {
      return adapter.isBefore(format, value, new Date);
    },
  };
}
