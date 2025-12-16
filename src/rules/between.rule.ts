import { ValidationRuleContract } from "../contracts.js";
import { isNumeric } from "../utils/number.util.js";

/**
 * The field under validation must be between min and max seed.
 * This will work with number as well as array.
 * In case of array, array values must be numbers between min and max seed.
 * @param args seeds
 */
export function between(args: Array<string>): ValidationRuleContract {
  if (args.length !== 2) {
    throw new Error('Invalid number of arguments.');
  }

  if (!isNumeric(args[0]) || !isNumeric(args[1])) {
    throw new TypeError('Seeds must be number.');
  }

  const min = Number(args[0]);
  const max = Number(args[1]);

  if (min >= max) {
    throw new RangeError('Seed min must be less then max.');
  }

  return {
    name: 'between',
    handler: (value: any): boolean => {
      if (Array.isArray(value)) {
        let i = 0;
        const len = value.length;

        for (i; i < len; i++) {
          const v = String(value[i]);

          if (!isNumeric(v)) {
            return false;
          }
        }

        const minV: number = Math.min(...value);
        const maxV: number = Math.max(...value);

        if (minV < min || maxV > max) {
          return false;
        }
        return true;
      }

      const v = String(value);

      if (!isNumeric(v)) {
        return false;
      }

      const valNum = Number(value);

      if (valNum < min || valNum > max) {
        return false;
      }

      return true;
    },
  };
}
