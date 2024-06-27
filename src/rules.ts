import { ValidationRuleContract } from './contracts.js';
import * as rules from './rules/index.js';

export const Rules: Record<string, (args?: Array<string>) => ValidationRuleContract> = {};

for (const name in rules) {
  Rules[name] = (rules as any)[name];
}