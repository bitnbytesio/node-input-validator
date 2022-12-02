import { ValidationRuleContract } from "../contracts.js";

/**
 * The field under validation is not required when set to null
 * @returns 
 */
export function nullable(): ValidationRuleContract {
  return {
    name: "nullable",
    handler: (value: any) => {
      if (value != null) {
        return -1
      }
      return true;
    },
  };
}

/**
 * The field under validation is only required if present
 * @returns 
 */
export function sometimes(): ValidationRuleContract {
  return {
    name: "sometimes",
    handler: (value: any, v: any, name: string, { inputs }: any) => {
      if (inputs[name] != undefined) {
        return -1
      }
      return true;
    },
  };
}

/**
 * @since v5
 * 
 * The field under validation will be skipped
 * @returns 
 */
export function skip(): ValidationRuleContract {
  return {
    name: "skip",
    handler: (value: any, v: any, name: string, { inputs }: any) => {
      return true;
    },
  };
}

type CustomHandler = ((value: any, v: any, name: string, { inputs }: any) => Promise<boolean> | boolean) | ((...args: any) => Promise<boolean> | boolean)

/**
 * @since v5
 * 
 * Apply custom rule on fly
 * @param handler 
 * @returns 
 */
export function custom(handler: CustomHandler) {
  return {
    name: 'custom',
    handler,
  };
}