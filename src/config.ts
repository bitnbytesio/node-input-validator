import { Langs } from "./contracts";
import { DateAdapter } from "./date/contracts";

export interface IConfig extends NodeJS.Dict<any> {
  wildcardIterations?: number;
  wildcardSeperator?: string;
  lang?: Langs,
  dateAdapter?: DateAdapter,
}

let config: IConfig = {
  wildcardIterations: 1000,
  wildcardSeperator: '.',
  lang: Langs.en_US,
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
