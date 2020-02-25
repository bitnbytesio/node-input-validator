const definitions = require('./definitions');

const objResult = ({ name, options = undefined, argumentsObj = [] }) => {

}

const isRequired = (rule) => {
    // like required|minLength:5
    return rule.includes('required') && !rule.includes('requiredIf');
}

const getRequiredRules = (rule) => {
    // cause the rule can contain options like required|minLength:5, required|email or just required
    // in this case we will have name|option:value, name|options, or just name
    const ruleSplitedWithOptions = rule.split('|');
    const name = ruleSplitedWithOptions[0];
    // has no params and no options just required
    if (ruleSplitedWithOptions.length === 1) return objResult({ name });
    // if has options descompose in params
    ruleSplitedWithOptions.shift();
    const options = ruleSplitedWithOptions.map(option => {
        // no params, no valuem  like required
        const optionSplited = option.split(':');
        // has 1 param without value like required|email
        if (optionSplited.length === 1) {
            return{
                name: optionSplited[0],
                value: undefined
            };
        }
        // has 1 params and value like required|maxLength:5 or
        // check that the value not have more values
        // required|in:1,2,3
        const valueSplited = optionSplited[1].split(',');
        return{
            name: optionSplited[0],
            value: valueSplited.length > 1 ? valueSplited : valueSplited.toString()
        };
    })
    return objResult({ name, options });
}

const getArgumentsDef = (name) => {
    const definitionObj = definitions.rules.find(d => d.name === name);
    return definitionObj.arguments;
}

const getValue = ({ argumentRule, type }) => {
    // delete the name in the rule in order to return the arguments
    if (type === 'array') return argumentRule.split(',');
    if (type === 'integer') return parseInt(argumentRule);
    if (type === 'boolean') return argumentRule == 'true';
    return argumentRule;
}

const isParamValueFunction = (nameRule) => {
    return ['requiredIf'].includes(nameRule);
}

const getElements = (rule) => {
    const indexSeparator = rule.indexOf(':');
    // email and other rules that hasn't params
    if (indexSeparator === -1) {
        return {
            arguments: undefined,
            name: rule,
            types: undefined,
        }
    }
    const nameRule = rule.substring(0, indexSeparator);
    // get the arguments from the definition
    const argString = rule.substring(indexSeparator+1, rule.length);
    const argumentsDef =  getArgumentsDef(nameRule);
    const argumentsRule =
        ((argumentsDef.length === 1) && ['string', 'array'].includes(argumentsDef[0].type)) ?
            [argString] :
            argString.toString().split(',');
    // if it's string and has one argument the defintion, return the value without split
    const argumentsResult = argumentsRule.map( (argumentRule, index) => {
        // calculate index for parameters that repeats like requiredIf:age,16,parent,yes,type,subscribed
        // Assume the params are param, value, param, value....
        const indexDef = isParamValueFunction(nameRule) ? index%2 : index;
        console.log('argumentRule', argumentRule);
        const { type, name, options } = argumentsDef[indexDef];
        return {
            name,
            options,
            type,
            value: getValue({ argumentRule, type }),
        }
    });
    const definitionObj = definitions.rules.find(d => d.name === nameRule);
    return {
        arguments: argumentsResult,
        name: nameRule,
        types: definitionObj ? definitionObj.types : undefined,
    }
}

module.exports.transformToObject = (rule) => {
    const hasRequired = isRequired(rule);
    // delete required if it contains because is a field in the root of the object
    if (hasRequired) {
        rule.shift();
    }
    const params = rule.map(subrule => getElements(subrule));
    return {
        params,
        required: hasRequired
    }
}

module.exports.transformToString = (ruleObj) => {
    const ruleFormated = ruleObj.params.map(prevParam => {
        const params = prevParam.arguments.reduce((prevArgs, ruleArgs) => {
            return `${prevArgs}${ruleArgs.value},`;
        }, '');
        // delete the last ,
        const paramsFormated =  (params !== '') ? params.substring(0, params.length - 1) : params;
        return `${prevParam.name}:${paramsFormated}`;
    });
    return (ruleObj.required) ? ['required', ...ruleFormated] : ruleFormated;
}


