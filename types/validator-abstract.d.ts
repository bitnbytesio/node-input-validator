/// <reference types="node" />
import { Langs, AttributeValidationMinimalInfo, ValidationRuleContract, ValidationRulesContract, ValidationRuleStringNotationContract, MessagesContract, NiceNamesContract, ValidatorErrorContract, ValidatorErrorsContract, ValidationRuleArrayStringNotationContract } from "./contracts";
/**
 * registerRules will replace old registered rules
 * @param rules validation rules
 */
export declare function registerRules(rules: any): any;
/**
 * registerPostRules will replace old post validation rules
 * @param rules post validation rules
 */
export declare function registerPostRules(rules: any): any;
export declare abstract class ValidatorAbstract {
    private inputs;
    private rules;
    private customMessages;
    implicitRules: Array<string>;
    errors: ValidatorErrorContract | ValidatorErrorsContract;
    localNiceNames: NiceNamesContract;
    hasCustomMessages: boolean;
    hasNestedRules: boolean;
    parsedRulesCollection: ValidationRulesContract;
    lang: Langs;
    postRules: Array<any>;
    breakWhenFailed: boolean;
    shouldRelease: boolean;
    implicitInputs: NodeJS.Dict<any>;
    /**
     * init validator
     * @param inputs
     * @param rules
     * @param customMessages
     */
    constructor(inputs?: any, rules?: ValidationRulesContract | ValidationRuleStringNotationContract | ValidationRuleArrayStringNotationContract, customMessages?: MessagesContract);
    /**
     * globally should break/bail on failed validation or not
     * @param {boolean} sure
     */
    static bailable(sure: boolean): void;
    /**
     * enable/disable multiple errors on current instance only
     * @param {boolean} sure
     */
    bail(sure: boolean): void;
    /**
     * release attribute from rules validation
     */
    release(): void;
    /**
     * check is instance is bailable or not
     * @returns {boolean}
     */
    isBailable(): boolean;
    /**
     * allows a custom rule to be added as an implicit rule for the instance only
     * @param {String} ruleName
     */
    addImplicitRule(ruleName: string): void;
    addRules(rules?: ValidationRulesContract | ValidationRuleStringNotationContract | ValidationRuleArrayStringNotationContract): void;
    postRuleApply(rule: any): Promise<any>;
    /**
    * add post rule
    *
    * post rule is applied to whole input and is used to check constraints
    * across multiple fields
    *
    * @param {*} rule
   */
    addPostRule(rule: any): void;
    /**
      * add set of post rules
      *
      * @param {string[]} postRulesObj
      */
    addPostRules(postRulesObj: any): void;
    /**
     * parse provided rules and inputs
     */
    parse(): void;
    parseRules(): void;
    fillMissingAttributes(key: string): void;
    parseInputs(): void;
    /**
     * apply this set of filters to inputs
     * @param filters set of filters
     */
    applyFilters(filters: any): void;
    /**
    * apply post validation rules
    * @param rules post rules
    */
    applyPostRules(rules: any): void;
    /**
     * validate inputs againest rules
     */
    validate(inputs?: any): Promise<boolean>;
    /**
    * apply rules on attribute
    * @param attrName attribute name
    * @param attrRules attribute rules
    */
    validateAttribute(attrName: string, attrRules: Array<ValidationRuleContract>): Promise<void>;
    /**
    * this will create error object for attribute
    * @param params info object
    */
    createAttributeError(params: AttributeValidationMinimalInfo): void;
    /**
     * this will return parsed error message as per rule or input
     * @param params object with attr and rule name, value, args
     */
    createAttributeErrorMessage(params: AttributeValidationMinimalInfo, useDefaultMessage?: boolean): string;
    /**
    * get attribute value by its name
    * @param attr attribute name
    */
    attributeValue(attr: string): any;
    /**
     * check if attribute has value
     * @param attr attribute name
     */
    doAttributeHasValue(attr: string): boolean;
    /**
     * does attribute present in given inputs
     * @param attr attribute name
     */
    isAttributePresent(attr: string): boolean;
    /**
     * does we have any dirty/failed input
     */
    hasErrors(): boolean;
    /**
     * get validation errors
     */
    getErrors(): any;
    niceNames(niceNames: NiceNamesContract): void;
}
