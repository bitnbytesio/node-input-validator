declare class Validator {

    errors: any = {};

    inputs: any = {};

    rules: any = {};

    lang: string;

    constructor(inputs: any, rules: any, customMessages?: any = {});

    static make(rules: any): Validator;

    apply(inputs: any): self;

    check(): Promise;

    setLang(lang: string);

    addError(key: string, rule: string, messages?: string);

    addPostRule(rule: any);

    addPostRules(rules: Array<any>);
}


declare namespace Validator {

    declare function setLang(lang: string);

    declare function extend(
        rule: string,
        func: any
    );

    declare function messages(
        custom_messages: any,
        lang: string = 'en'
    );

    function koa();

    export { setLang, extend, messages, koa };
}

export = Validator;