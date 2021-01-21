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
    throw new TypeError('First element must be date format.')
  }

  return {
    name: "dateAfter",
    handler: (value: any): boolean => {
      return adapter.isAfter(format, value, dateToCompare || new Date);
    },
  };
}

export function after(args: Array<Date | string | number>): ValidationRuleContract {
  if (!args.length || args.length > 2) {
    throw new Error('Rule accepts 2 argument (format,[date optional]).');
  }

  const adapter: DateAdapter = dateAdapter();
  const [format, dateToCompare] = args;

  if (typeof format !== 'string') {
    throw new TypeError('First element must be date format.')
  }

  return {
    name: "after",
    handler: (value: any): boolean => {
      return adapter.isAfter(format, value, dateToCompare || new Date());
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
    throw new TypeError('First element must be date format.')
  }

  return {
    name: "dateBefore",
    handler: (value: any) => {
      return adapter.isBefore(format, value, dateToCompare);
    },
  };
}

export function before(args: Array<Date | string | number>): ValidationRuleContract {
  if (!args.length || args.length > 2) {
    throw new Error('Rule accepts 2 argument (format,[date optional]).');
  }

  const adapter: DateAdapter = dateAdapter();
  const [format, dateToCompare] = args;

  if (typeof format !== 'string') {
    throw new TypeError('First element must be date format.')
  }

  return {
    name: "before",
    handler: (value: any): boolean => {
      return adapter.isBefore(format, value, dateToCompare || new Date());
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

export function dateFormat(args: Array<string>): ValidationRuleContract {
  if (args.length !== 1) {
    throw new Error('Rule accepts only 1 argument (format).');
  }

  const [format] = args;
  const adapter: DateAdapter = dateAdapter();

  return {
    name: "dateFormat",
    handler: (value: any): boolean => {
      return adapter.isValidDateFormat(value, format);
    },
  };
}

export function dateISO(): ValidationRuleContract {
  const adapter: DateAdapter = dateAdapter();

  return {
    name: "dateISO",
    handler: (value: any) => {
      return adapter.isValidIsoDateFormat(value);
    },
  };
}

// export { dateISO as dateiso, dateISO as iso8601 };

export function datetime(): ValidationRuleContract {
  const adapter: DateAdapter = dateAdapter();

  return {
    name: 'datetime',
    handler: (value: any): boolean => {
      return adapter.isValidDateFormat(value, adapter.FORMAT_DATETIME);
    }
  }
}


export function date(args: Array<string> = []): ValidationRuleContract {
  const adapter: DateAdapter = dateAdapter();
  const [format = adapter.FORMAT_DATE] = args;

  return {
    name: 'date',
    handler: (value: any): boolean => {
      return adapter.isValidDateFormat(value, format);
    }
  }
}
