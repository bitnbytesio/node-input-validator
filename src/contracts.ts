
/**
 * validation error object interface
 */
export interface ValidatorErrorAttributeContract {
  message: string;
  rule: string;
}

/**
 * validation errors array interface
 */
export interface ValidatorErrorContract {
  [key: string]: ValidatorErrorAttributeContract;
}

/**
 * validation rule interface
 * each validation rule should implement this interface
 */
export interface ValidationRuleContract {
  name: string;
  handler: Function;
  args?: any;
  nullable?: boolean;
}

/**
 * set of validation rules interface
 */
export interface ValidationRulesContract {
  [key: string]: Array<ValidationRuleContract>;
}

/**
 * set of string notation validation rules
 */
export interface ValidationRuleStringNotationContract {
  [key: string]: string;
}

/**
 * set of methods that rules may need
 */
export interface ValidatorContract {
  /**
   * get attribute value
   * @param attrName attribute name
   */
  attributeValue(attrName: string): any;
}

/**
 * custom attributes interface
 */
export interface NiceNamesContract {
  [key: string]: string;
}

/**
 * messages interface
 */
export interface MessagesContract {
  [key: string]: string;
}

export interface MessagesDictContract {
  $niceNames: NodeJS.Dict<string>;
  $custom: NodeJS.Dict<string>;
  $default: string;
  [key: string]: string | NodeJS.Dict<string>;
}

export interface AttributeValidationMinimalInfo {
  attrName: string;
  ruleName: string;
  attrValue?: any;
  ruleArgs?: any;
}

export enum Langs {
  "en_US",
}
