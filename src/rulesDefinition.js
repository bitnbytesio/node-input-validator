const {rules, types} = require('./definitions');

function definitions() {
    const ruleDefinitions = {};

    for (const type of Object.values(types)) {
        ruleDefinitions[type] = rules.filter(r => r.types.find(t => t === type));
    }

    return ruleDefinitions;
}

module.exports = definitions();
