const definitions = require('../definitions');

const getArgumentsDef = (name) => {
    const definitionObj = definitions.rules.find((d) => d.name === name);
    return definitionObj.arguments;
};

const getValue = ({ argumentRule, type }) => {
    // delete the name in the rule in order to return the arguments
    if (type === 'array') return argumentRule.split(',');
    // eslint-disable-next-line radix
    if (type === 'integer') return parseInt(argumentRule);
    if (type === 'boolean') return argumentRule === 'true';
    return argumentRule;
};

const isParamValueFunction = (nameRule) => ['requiredIf'].includes(nameRule);

const getElements = (rule) => {
    const indexSeparator = rule.indexOf(':');
    // email and other rules that hasn't params
    if (indexSeparator === -1) {
        const definitionObj = definitions.rules.find((d) => d.name === rule);
        return {
            arguments: undefined,
            name: rule,
            types: definitionObj ? definitionObj.types : undefined,
        };
    }
    const nameRule = rule.substring(0, indexSeparator);
    // get the arguments from the definition
    const argString = rule.substring(indexSeparator + 1, rule.length);
    const argumentsDef = getArgumentsDef(nameRule);
    const argumentsRule = ((argumentsDef.length === 1) && ['string', 'array'].includes(argumentsDef[0].type))
        ? [argString]
        : argString.toString().split(';');
    // if it's string and has one argument the defintion, return the value without split
    const argumentsResult = argumentsRule.map((argumentRule, index) => {
        // calculate index for parameters that repeats like requiredIf:age,16,parent,yes,type,subscribed
        // Assume the params are param, value, param, value....
        const indexDef = isParamValueFunction(nameRule) ? index % 2 : index;
        const { type, name, options } = argumentsDef[indexDef];
        return {
            name,
            options,
            type,
            value: getValue({ argumentRule, type }),
        };
    });
    const definitionObj = definitions.rules.find((d) => d.name === nameRule);
    return {
        arguments: argumentsResult,
        name: nameRule,
        types: definitionObj ? definitionObj.types : undefined,
    };
};

module.exports.toObject = (rule) => {
    const params = rule.map((subrule) => getElements(subrule));
    return {
        params,
    };
};

module.exports.normalize = (ruleObj) => ruleObj.params.map((prevParam) => {
    if (!prevParam.arguments) {
        return prevParam.name;
    }
    const params = prevParam.arguments.reduce((prevArgs, ruleArgs) => `${prevArgs}${ruleArgs.value};`, '');
    // delete the last ,
    const paramsFormated = (params !== '') ? params.substring(0, params.length - 1) : params;
    return `${prevParam.name}:${paramsFormated}`;
});
