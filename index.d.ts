declare class Validator {

    errors: any;

    validations: any;

    filters: any;

    lang: string;

    postValidations: any;

    inputs: any;

    filterInputs: any;

    rules: any;

    customMessages: any;


    constructor(inputs: any, rules: any, customMessages?: any);

    static make(inputs: any, rules: any, messages: any): Validator;

    static create(rules: any, messages): Validator;

    apply(inputs: any): Promise<any>;

    check(): Promise<any>;

    fails(): Promise<any>;

    passes(): Promise<any>;

    setLang(lang: string);

    isEmpty(value: any): boolean;

    addError(key: string, rule: string, messages?: string);

    addPostRule(rule: any): void;

    addPostRules(rules: Array<any>): void;

    check(): Promise<any>;

    parseKey(key: any, data: any): any;

    inputVal(attribute: any, multiple: boolean): any;

    parseRules(rules: any);

    makeValidationsFromArray(rules: any);

    populateRule(attribute: any);

    parseMessage(rule: any, field: any, value?: any, args?: any);

    parseExistingMessageOnly(rule: any, field: any, value?: any, args?: any);
}


declare namespace Validator {

    function setLang(lang: string);

    function extend(
        rule: string,
        func: any
    );

    function messages(
        newMessages: any,
        lang?: string
    );

    function customMessages(
        customMessages: any,
        lang?: string
    );

    function koa();

    export { setLang, extend, messages, koa };
}

export = Validator;
