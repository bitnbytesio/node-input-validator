interface Config extends NodeJS.Dict<any> {
  wildcardIterations: number;
  wildcardSeperator: string;
}

let config: Config = {
  wildcardIterations: 1000,
  wildcardSeperator: '.',
};

export function set(customConfig: Config) {
  config = { ...config, ...customConfig }
}

export function get() {
  return config;
}
