import { Langs } from "./contracts";

export interface IConfig extends NodeJS.Dict<any> {
  wildcardIterations?: number;
  wildcardSeperator?: string;
  lang?: Langs,
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
