export function setLang(lang: string);

export function extend(name: string, callback: any);

export function extendMessages(newMessages: object, lang?: string);

export function addCustomMessages(customMessages: object, lang?: string);

export function niceNames(attributes: object, lang?: string);

export function koa();

export declare class Validator {

  inputs: any;
  errors: any;
  postValidation: any;
  filters: any;
  lang: string;
  customMessages: any;
  attributeNames: any;
  wasFailed: any;
  doBail: any;
  validationRules: any;

  constructor(inputs: object, rules: object, customMessages?: object);

  bail(sure?: boolean);

  niceNames(attributeNames: object);

  parseRules(validationRules: object): void;

  check(): Promise<boolean>

  fails(): Promise<boolean>;

  passes(): Promise<boolean>;

  parseValue(attribute: string): any;

  applyOnDeep(attributes: any);

  parseNestedAttr(attribute: any);

  apply(attr: string);

  postApply(rule: any);

  addPostRule(rule: any): void;

  addPostRules(rulesObject: any): void;

  getParsedMessage(options: any): string;

  getExistinParsedMessage(options: any): string;

  addError(key: string, rule: string, message: string);
}
