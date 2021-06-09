import { messageParser } from "./utils/message-parser.util";
import {
  Langs,
  AttributeValidationMinimalInfo,
  ValidationRuleContract,
  ValidationRulesContract,
  ValidationRuleStringNotationContract,
  MessagesContract,
  NiceNamesContract,
  ValidatorErrorContract,
  ValidatorErrorsContract,
  ValidationRuleArrayStringNotationContract,
} from "./contracts";
import { reallyEmpty } from "./utils/ops.util";
import { fillMissingSpots, getValueByStringNotation, getValuesByWildCardStringNotation } from "./utils/obj.util";
import { parseStringNotationRules, parseStringRule } from "./utils/rules-parser.util";
import * as MessagesProvider from './messages/provider';

import * as config from './config';

let RulesProvider: any = {};
let PostRulesProvider: any = {};

/**
 * registerRules will replace old registered rules 
 * @param rules validation rules
 */
export function registerRules(rules: any) {
  // Object.keys(rules).forEach((rule) => {
  //   RulesProvider[rule] = rules[rule];
  // });

  // return RulesProvider;
  return RulesProvider = rules;
}

/**
 * registerPostRules will replace old post validation rules
 * @param rules post validation rules
 */
export function registerPostRules(rules: any) {
  return PostRulesProvider = rules;
}

// you can change this value with static method
let shouldBreakIfFailed = true;

export abstract class ValidatorAbstract {
  implicitRules: Array<string> = config.get('implicitRules');

  // validation errors collection
  errors: ValidatorErrorContract | ValidatorErrorsContract = {};

  // local custom attributes collection
  localNiceNames: NiceNamesContract = {};

  // do we have custom messages?
  hasCustomMessages: boolean = false;

  // notationMap: any = {};
  // notationVals: any = {};

  // do we have nested rules?
  hasNestedRules: boolean = false;

  // rules collection
  parsedRulesCollection: ValidationRulesContract = {};

  lang: Langs = config.get('lang');

  // post validation rules collection
  postRules: Array<any> = [];

  // break rules validation loop when failed
  breakWhenFailed = shouldBreakIfFailed;

  // release attribute from futher validation rules
  shouldRelease = false;

  /**
   * init validator
   * @param inputs 
   * @param rules 
   * @param customMessages 
   */
  constructor(
    private inputs: any = {},
    private rules:
      | ValidationRulesContract
      | ValidationRuleStringNotationContract
      | ValidationRuleArrayStringNotationContract = {},
    private customMessages: MessagesContract = {},
  ) {
    this.hasCustomMessages = Object.keys(customMessages).length > 0;
    this.parse();
  }

  /**
   * globally should break/bail on failed validation or not
   * @param {boolean} sure
   */
  static bailable(sure: boolean) {
    shouldBreakIfFailed = sure;
  }

  /**
   * enable/disable multiple errors on current instance only
   * @param {boolean} sure
   */
  bail(sure: boolean) {
    this.breakWhenFailed = sure;
  }

  /**
   * release attribute from rules validation
   */
  release() {
    this.shouldRelease = true;
  }

  /**
   * check is instance is bailable or not
   * @returns {boolean}
   */
  isBailable(): boolean {
    return this.breakWhenFailed;
  }

  /**
   * allows a custom rule to be added as an implicit rule for the instance only
   * @param {String} ruleName
   */
  addImplicitRule(ruleName: string) {
    this.implicitRules.push(ruleName);
  }

  addRules(rules:
    | ValidationRulesContract
    | ValidationRuleStringNotationContract
    | ValidationRuleArrayStringNotationContract = {}) {
    this.rules = rules;
    this.parseRules();
  }


  async postRuleApply(rule: any) {
    if (rule.rule === 'function') {
      // eslint-disable-next-line no-return-await
      return await rule.handler(this);
    }

    // eslint-disable-next-line no-return-await
    return await PostRulesProvider[rule.rule](rule, this);
  }

  /**
  * add post rule
  *
  * post rule is applied to whole input and is used to check constraints
  * across multiple fields
  *
  * @param {*} rule
 */
  addPostRule(rule: any) {
    if (typeof rule === 'function') {
      this.postRules.push({
        rule: 'function',
        handler: rule,
      });
      return;
    }

    const ruleArray = rule.split(':', 2);
    const ruleName = ruleArray[0];
    const ruleFields = ruleArray[1].split(','); // there always be a list of fields

    this.postRules.push({
      rule: ruleName,
      params: ruleFields,
    });
  }

  /**
    * add set of post rules
    *
    * @param {string[]} postRulesObj
    */
  addPostRules(postRulesObj: any) {
    if (!Array.isArray(postRulesObj)) {
      postRulesObj = postRulesObj.split('|');
    }

    postRulesObj.map((rule: any) => this.addPostRule(rule));
  }

  /**
   * parse provided rules and inputs
   */
  parse() {
    this.parseRules();
    this.parseInputs();
  }

  parseRules() {
    let attr: string;

    for (attr of Object.keys(this.rules)) {
      if (attr === '*') {
        this.addPostRules(this.rules[attr]);
        return;
      }

      if (attr.indexOf(".")) {
        this.hasNestedRules = true;
      }

      const attrRules = this.rules[attr];

      if (typeof attrRules === 'string') {
        this.parsedRulesCollection[attr] = parseStringNotationRules(RulesProvider, attrRules);
      } else {
        attrRules.forEach((strRule: any, index: number) => {
          if (typeof strRule === 'string') {
            attrRules[index] = parseStringRule(RulesProvider, strRule);
          }
        });

        // @ts-ignore
        this.parsedRulesCollection[attr] = attrRules;
      }

      // sort rules as
      this.parsedRulesCollection[attr].sort((obj: any) => {
        return (this.implicitRules.indexOf(obj.name) >= 0) ? -1 : 1;
      });
    }
  }

  fillMissingAttributes(key: string) {
    const data: any = {};
    const [frontKey] = key.split('.');
    data[frontKey] = this.inputs[frontKey];

    // let f = false;

    if (key[key.length - 1] !== '*') {
      fillMissingSpots(data, key, null, true);
    }
    // else {
    //   f = true;
    //   console.log(key);
    // }

    const { notationMap } = getValuesByWildCardStringNotation(data);

    // if (f) {
    //   console.log(notationMap, )
    // }

    const keys = Object.keys(notationMap);
    const len = keys.length;
    let i = 0;
    for (i; i < len; i += 1) {
      const key = keys[i];
      const attrRules: Array<ValidationRuleContract> = this.parsedRulesCollection[key];
      if (attrRules && key.indexOf('*') >= 0) {
        notationMap[key].forEach((attrName: string) => {
          this.parsedRulesCollection[attrName] = attrRules;
        });
      }
    }
  }

  parseInputs() {
    if (!this.hasNestedRules) {
      return;
    }

    // const flat = (data: any, prepend = '') => {
    //   const results: any = {};

    //   Object.keys(data).forEach(key => {
    //     const value = data[key];

    //     if (typeof value === 'object') {
    //       results.push(...results, ...flat(value, prepend + key + '.'));
    //     } else {
    //       results[prepend + key] = value;
    //     }
    //   });

    //   return results;
    // }

    Object.keys(this.rules).forEach((key) => {
      if (key.indexOf('*') >= 0) {
        this.fillMissingAttributes(key);
      }
    });

    // const { notationMap, notationsVals } = getValuesByWildCardStringNotation(
    //   this.inputs, this.rules,
    // );
    // this.notationMap = notationMap;
    // this.notationVals = notationsVals;

    // const keys = Object.keys(this.notationMap);
    // const len = keys.length;
    // let i = 0;
    // for (i; i < len; i += 1) {
    //   const key = keys[i];
    //   const attrRules: Array<ValidationRuleContract> = this.parsedRulesCollection[key];
    //   if (attrRules && key.indexOf('*') >= 0) {
    //     this.notationMap[key].forEach((attrName: string) => {
    //       this.parsedRulesCollection[attrName] = attrRules;
    //     });
    //   }
    // }
  }

  /**
   * apply this set of filters to inputs
   * @param filters set of filters
   */
  applyFilters(filters: any) {
    // future ref
  }

  /**
  * apply post validation rules
  * @param rules post rules
  */
  applyPostRules(rules: any) {
    // to-do
  }

  /**
   * validate inputs againest rules
   */
  async validate(inputs?: any): Promise<boolean> {
    if (inputs) {
      this.inputs = inputs;
      this.parseInputs();
    }

    const keys = Object.keys(this.parsedRulesCollection);
    const len = keys.length;
    let i = 0;
    const promises = [];

    for (i; i < len; i += 1) {
      const attrName = keys[i];
      if (attrName.indexOf('*') < 0) {
        const attrRules: Array<ValidationRuleContract> = this.parsedRulesCollection[attrName];
        if (attrRules) {
          promises.push(this.validateAttribute(attrName, attrRules));
        }
      }
    }

    // post validation rules
    this.postRules.forEach((postRule: any) => {
      promises.push(this.postRuleApply(postRule));
    });


    await Promise.all(promises);

    return !this.hasErrors();
  }


  /**
  * apply rules on attribute
  * @param attrName attribute name
  * @param attrRules attribute rules
  */
  async validateAttribute(
    attrName: string,
    attrRules: Array<ValidationRuleContract>,
  ) {
    let i = 0;
    let len = attrRules.length;

    for (i; i < len; i += 1) {
      const validationRule: ValidationRuleContract = attrRules[i];
      let attrValue = this.attributeValue(attrName);

      if (
        // no implicit rule and attribute value is empty
        (this.implicitRules.indexOf(validationRule.name) < 0 &&
          reallyEmpty(attrValue))
        // attribute can be nullable
        // (validationRule.name === "nullable" && attrValue === null) ||
        // // attribute will only be validated if presents
        // (validationRule.name === "sometimes" &&
        //   this.isAttributePresent(attrName) === false)
      ) {
        if (this.isBailable()) {
          // console.log(' here i m ...');
          return;
        }

        attrValue = '';
      }

      // console.log(this.breakWhenFailed, this.isBailable());

      const passed = await validationRule.handler(attrValue, this, attrName);

      this.shouldRelease = false;


      // console.log('attr', attrName, validationRule.name, passed);

      if (!passed) {
        this.createAttributeError({
          attrName,
          attrValue,
          ruleName: validationRule.name,
          ruleArgs: validationRule.args,
        });

        if (this.isBailable()) {
          return;
        }
      }
    }
  }

  /**
  * this will create error object for attribute
  * @param params info object
  */
  createAttributeError(params: AttributeValidationMinimalInfo): void {
    const { attrName, ruleName } = params;

    const error = {
      rule: ruleName,
      message: this.createAttributeErrorMessage(params),
    };

    if (!this.breakWhenFailed) {
      if (!this.errors[attrName]) {
        this.errors[attrName] = [];
      }

      // @ts-ignore
      this.errors[attrName].push(error);
      return;
    }
    this.errors[attrName] = error;
  }

  /**
   * this will return parsed error message as per rule or input
   * @param params object with attr and rule name, value, args
   */
  createAttributeErrorMessage(
    params: AttributeValidationMinimalInfo,
    useDefaultMessage: boolean = true,
  ): string {
    const { attrName, ruleName, attrValue, ruleArgs } = params;

    const messagesCollection: any = MessagesProvider.messagesRefByLang(this.lang);
    const defaultMessage = messagesCollection.$default;

    let message: any;

    // check for local scope messages
    if (this.hasCustomMessages) {
      message = this.customMessages[`${attrName}.${ruleName}`] ||
        this.customMessages[ruleName] ||
        this.customMessages[attrName];
    }

    // not found in local scope, check for global scope
    if (!message) {
      message = (messagesCollection.$custom &&
        messagesCollection.$custom[`${attrName}.${ruleName}`]) ||
        (messagesCollection.$custom && messagesCollection.$custom[attrName]) ||
        messagesCollection[ruleName];

      if (useDefaultMessage && !message) {
        message = defaultMessage;
      }
    }

    let attributeName = attrName;

    let niceName;

    // check if we have nice name in local scope
    if (this.localNiceNames[attrName]) {
      niceName = this.localNiceNames[attrName];
    } else if (
      messagesCollection.$niceNames && messagesCollection.$niceNames[attrName]
    ) {
      // check if we have nice name in global scope
      niceName = messagesCollection.$niceNames[attrName];
    }

    return messageParser({
      message,
      attrName: attributeName,
      niceName,
      ruleName,
      attrValue,
      ruleArgs,
    });
  }

  /**
  * get attribute value by its name
  * @param attr attribute name
  */
  attributeValue(attr: string): any {
    return getValueByStringNotation(this.inputs, attr);
    // return this.inputs[attr] || this.notationVals[attr];
  }

  /**
   * check if attribute has value
   * @param attr attribute name
   */
  doAttributeHasValue(attr: string): boolean {
    return this.attributeValue(attr) === undefined ? true : false;
  }

  /**
   * does attribute present in given inputs
   * @param attr attribute name
   */
  isAttributePresent(attr: string): boolean {
    if (this.inputs[attr]) {
      return true;
    }

    return false;
  }

  /**
   * does we have any dirty/failed input
   */
  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * get validation errors
   */
  getErrors(): any {
    return this.errors;
  }

  niceNames(niceNames: NiceNamesContract) {
    this.localNiceNames = niceNames;
  }
}
