"use strict";

var definitions = require('./definitions');

var getArgumentsDef = function getArgumentsDef(name) {
  var definitionObj = definitions.rules.find(function (d) {
    return d.name === name;
  });
  return definitionObj.arguments;
};

var getValue = function getValue(_ref) {
  var argumentRule = _ref.argumentRule,
      type = _ref.type;
  // delete the name in the rule in order to return the arguments
  if (type === 'array') return argumentRule.split(','); // eslint-disable-next-line radix

  if (type === 'integer') return parseInt(argumentRule);
  if (type === 'boolean') return argumentRule === 'true';
  return argumentRule;
};

var isParamValueFunction = function isParamValueFunction(nameRule) {
  return ['requiredIf'].includes(nameRule);
};

var getElements = function getElements(rule) {
  var indexSeparator = rule.indexOf(':'); // email and other rules that hasn't params

  if (indexSeparator === -1) {
    var _definitionObj = definitions.rules.find(function (d) {
      return d.name === rule;
    });

    return {
      arguments: undefined,
      name: rule,
      types: _definitionObj ? _definitionObj.types : undefined
    };
  }

  var nameRule = rule.substring(0, indexSeparator); // get the arguments from the definition

  var argString = rule.substring(indexSeparator + 1, rule.length);
  var argumentsDef = getArgumentsDef(nameRule);
  var argumentsRule = argumentsDef.length === 1 && ['string', 'array'].includes(argumentsDef[0].type) ? [argString] : argString.toString().split(','); // if it's string and has one argument the defintion, return the value without split

  var argumentsResult = argumentsRule.map(function (argumentRule, index) {
    // calculate index for parameters that repeats like requiredIf:age,16,parent,yes,type,subscribed
    // Assume the params are param, value, param, value....
    var indexDef = isParamValueFunction(nameRule) ? index % 2 : index;
    var _argumentsDef$indexDe = argumentsDef[indexDef],
        type = _argumentsDef$indexDe.type,
        name = _argumentsDef$indexDe.name,
        options = _argumentsDef$indexDe.options;
    return {
      name: name,
      options: options,
      type: type,
      value: getValue({
        argumentRule: argumentRule,
        type: type
      })
    };
  });
  var definitionObj = definitions.rules.find(function (d) {
    return d.name === nameRule;
  });
  return {
    arguments: argumentsResult,
    name: nameRule,
    types: definitionObj ? definitionObj.types : undefined
  };
};

module.exports.toObject = function (rule) {
  var params = rule.map(function (subrule) {
    return getElements(subrule);
  });
  return {
    params: params
  };
};

module.exports.normalize = function (ruleObj) {
  return ruleObj.params.map(function (prevParam) {
    if (!prevParam.arguments) {
      return prevParam.name;
    }

    var params = prevParam.arguments.reduce(function (prevArgs, ruleArgs) {
      return "".concat(prevArgs).concat(ruleArgs.value, ",");
    }, ''); // delete the last ,

    var paramsFormated = params !== '' ? params.substring(0, params.length - 1) : params;
    return "".concat(prevParam.name, ":").concat(paramsFormated);
  });
};