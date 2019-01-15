declare class Validator {

    errors: any = {};

    validations: any = {};

    filters: any = {};

    lang: string;

    postValidations: any = [];

    inputs: any = {};

    filterInputs: any = {};

    rules: any = {};

    customMessages: any = {};


    constructor(inputs: any, rules: any, customMessages?: any = {});

    static make(inputs: any, rules: any, messages: any = {}): Validator;

    static create(rules: any, messages: any = {}): Validator;

    apply(inputs: any): Promise;

    check(): Promise;

    fails(): Promise;

    passes(): Promise;

    setLang(lang: string);

    isEmpty(value: any): boolean;

    addError(key: string, rule: string, messages?: string);

    addPostRule(rule: any): void;

    addPostRules(rules: Array<any>): void;

    check(): Promise;

    parseKey(key: any, data: any): any;

    inputVal(attribute: any, multiple: boolean = false): any;

    parseRules(rules: any);

    makeValidationsFromArray(rules: any);

    populateRule(attribute: any);

    parseMessage(rule: any, field: any, value?: any, args: any = []);

    parseExistingMessageOnly(rule: any, field: any, value?: any, args: any = []);
}


declare namespace Validator {

    declare function setLang(lang: string);

    declare function extend(
        rule: string,
        func: any
    );

    declare function messages(
        newMessages: any,
        lang: string = 'en'
    );

    declare function customMessages(
        customMessages: any,
        lang: string = 'en'
    );

    function koa();

    export { setLang, extend, messages, koa };
}

export = Validator;