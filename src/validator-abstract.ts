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
} from "./contracts";
import { implicitRules } from "./implicit-rules";
import { reallyEmpty } from "./utils/ops.util";
import { getValuesByWildCardStringNotation } from "./utils/obj.util";
import { parseStringNotationRules } from "./utils/rules-parser.util";
import * as MessagesProvider from './messages/provider';

let RulesProvider: any = {};

export function registerRules(rules: any) {
  // Object.keys(rules).forEach((rule) => {
  //   RulesProvider[rule] = rules[rule];
  // });

  // return RulesProvider;
  return RulesProvider = rules;
}

export abstract class ValidatorAbstract {
  // validation errors collection
  errors: ValidatorErrorContract = {};

  // local custom attributes collection
  niceNames: NiceNamesContract = {};

  // do we have custom messages?
  hasCustomMessages: boolean = false;

  notationMap: any = {};
  notationVals: any = {};

  // do we have nested rules?
  hasNestedRules: boolean = false;

  // rules collection
  parsedRulesCollection: ValidationRulesContract = {};

  /**
   * init validator
   * @param inputs 
   * @param rules 
   * @param customMessages 
   */
  constructor(
    private inputs: any,
    private rules:
      | ValidationRulesContract
      | ValidationRuleStringNotationContract = {},
    private customMessages: MessagesContract = {},
  ) {
    this.hasCustomMessages = Object.keys(customMessages).length > 0;
    this.parse();
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
      if (attr.indexOf(".")) {
        this.hasNestedRules = true;
      }

      const attrRules = this.rules[attr];

      if (typeof attrRules === 'string') {
        this.parsedRulesCollection[attr] = parseStringNotationRules(RulesProvider, attrRules);
      } else {
        // @ts-ignore
        this.parsedRulesCollection[attr] = attrRules;
      }

      // sort rules as
      this.parsedRulesCollection[attr].sort((obj: any) => {
        return (implicitRules.indexOf(obj.name) >= 0) ? -1 : 1;
      });
    }
  }

  parseInputs() {
    if (!this.hasNestedRules) {
      return;
    }

    const { notationMap, notationsVals } = getValuesByWildCardStringNotation(
      this.inputs,
    );
    this.notationMap = notationMap;
    this.notationVals = notationsVals;

    const keys = Object.keys(this.notationMap);
    const len = keys.length;
    let i = 0;
    for (i; i < len; i += 1) {
      const key = keys[i];
      const attrRules: Array<ValidationRuleContract> = this.parsedRulesCollection[key];
      if (attrRules && key.indexOf('*') >= 0) {
        this.notationMap[key].forEach((attrName: string) => {
          this.parsedRulesCollection[attrName] = attrRules;
        });
      }
    }
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
  async validate(): Promise<boolean> {
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
      const attrValue = this.attributeValue(attrName);
      if (
        // no implicit rule and attribute value is empty
        (implicitRules.indexOf(validationRule.name) < 0 &&
          reallyEmpty(attrValue)) ||
        // attribute can be nullable
        (validationRule.name === "nullable" && attrValue === null) ||
        // attribute will only be validated if presents
        (validationRule.name === "sometimes" &&
          this.isAttributePresent(attrName) === false)
      ) {
        return;
      }

      // console.log('attr val', attrValue);
      const passed = await validationRule.handler(attrValue, this, attrName)
      if (!passed) {
        this.createAttributeError({
          attrName,
          attrValue,
          ruleName: validationRule.name,
          ruleArgs: validationRule.args,
        });
      }
    }
  }

  /**
  * this will create error object for attribute
  * @param params info object
  */
  createAttributeError(params: AttributeValidationMinimalInfo): void {
    const { attrName, ruleName } = params;
    this.errors[attrName] = {
      rule: ruleName,
      message: this.createAttributeErrorMessage(params),
    };
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

    const messagesCollection: any = MessagesProvider.messagesRefByLang(Langs.en_US);
    const defaultMessage = messagesCollection.$default;

    let message;

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
        messagesCollection[ruleName] ||
        (messagesCollection.$custom && messagesCollection.$custom[attrName]);

      if (useDefaultMessage && !message) {
        message = defaultMessage;
      }
    }

    let attributeName = attrName;

    // check if we have nice name in local scope
    if (this.niceNames[attrName]) {
      attributeName = this.niceNames[attrName];
    } else if (
      messagesCollection.$niceNames && messagesCollection.$niceNames[attrName]
    ) {
      // check if we have nice name in global scope
      attributeName = messagesCollection.$niceNames[attrName];
    }

    return messageParser({
      message,
      attrName: attributeName,
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
    return this.inputs[attr] || this.notationVals[attr];
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
    if (this.inputs[attr] || this.notationVals[attr]) {
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
}
