import { ValidatorContract } from "../contracts.js";

/**
 * Post rule: All specified fields must be present in input
 * @param rule - { rule: 'all', params: ['field1', 'field2', ...] }
 * @param v - validator instance
 */
export async function all(rule: { params: Array<string> }, v: ValidatorContract) {
  const fields = rule.params;
  const missingFields: Array<string> = [];

  for (const field of fields) {
    const value = v.attributeValue(field);
    if (value === undefined || value === null || value === '') {
      missingFields.push(field);
    }
  }

  if (missingFields.length === 0) {
    return true;
  }

  missingFields.forEach((attrName) => {
    v.createAttributeError({
      ruleName: 'required',
      attrName,
      attrValue: v.attributeValue(attrName),
      ruleArgs: fields,
    });
  });

  v.createAttributeError({
    ruleName: 'all',
    attrName: '*',
    attrValue: null,
    ruleArgs: fields,
  });

  return false;
}
