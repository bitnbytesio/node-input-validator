import { Langs } from "./contracts.js";
import { DateAdapter } from "./date/contracts.js";

export interface IConfig extends NodeJS.Dict<any> {
  wildcardIterations?: number;
  wildcardSeperator?: string;
  lang?: Langs,
  dateAdapter?: DateAdapter,
  implicitRules?: Array<string>,
}

let config: IConfig = {
  wildcardIterations: 1000,
  wildcardSeperator: '.',
  lang: Langs.en_US,
  implicitRules: [
    "required",
    "requiredIf",
    "requiredNotIf",
    "requiredWith",
    "requiredWithout",
    "accepted",
    "sometimes",
    "nullable",
  ],
};

export function set(customConfig: IConfig) {
  config = { ...config, ...customConfig }
}

export function get(key?: string, defaultValue = null) {

  if (key) {
    return config[key] || defaultValue;
  }

  return config;
}

export function modify(key: string, value: Langs | DateAdapter) {
  config[key] = value;
}

export function addImplicitRule(ruleName:string) {
  config.implicitRules?.push(ruleName);
}