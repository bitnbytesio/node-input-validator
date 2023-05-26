export function setLang(lang: string): void;

export function extend(name: string, callback: any): void;

export function extendMessages(newMessages: object, lang?: string): void;

export function addCustomMessages(customMessages: object, lang?: string): void;

export function niceNames(attributes: object, lang?: string): void;

export function koa(): Function;

export function bailable(sure: boolean): void;

export function assert(rules: object): any;

export function setStrNotationRepetition(repetition: number): void;

export function addImplicitRule(ruleName: string): void;


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

  bail(sure?: boolean): void;

  niceNames(attributeNames: object): void;

  parseRules(validationRules: object): void;

  getErrors(): any;

  validate(): Promise<boolean>;

  check(): Promise<boolean>;

  fails(): Promise<boolean>;

  passes(): Promise<boolean>;

  parseValue(attribute: string): any;

  applyOnDeep(attributes: any): Promise<void>;

  parseNestedAttr(attribute: any): void;

  apply(attr: string): boolean | undefined;

  postApply(rule: any): Promise<void>;

  addPostRule(rule: any): void;

  addPostRules(rulesObject: any): void;

  getParsedMessage(options: any): string;

  getExistinParsedMessage(options: any): string;

  error(key: string, rule: string, message: string): void;

  addError(key: string, rule: string, message: string): void;

  appendError(key: string, rule: string, message: string): void;
}
