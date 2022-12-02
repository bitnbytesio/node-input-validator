import { ValidationRuleContract } from "../contracts.js";

const iso8601Regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

/**
 * @since v3.6
 * 
 * The field under validation must be a valid ISO date string
 * @returns 
 */
export function dateiso(): ValidationRuleContract {
  return {
    name: "dateiso",
    handler: (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }

      return iso8601Regex.test(value);
    },
  };
}

/** 
 * @alias {@link dateiso}
 * 
 * The field under validation must be a valid ISO date string.
 * @returns 
 */
export function iso8601(): ValidationRuleContract {
  return dateiso();
}
