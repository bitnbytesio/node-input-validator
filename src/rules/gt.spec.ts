import {ValidatorLite} from '../mock/validator-lite.mock'
import { gt } from "./gt.rule";

test("rules:gt", function (): void {
  const ruleHandler = gt(["max"]).handler;
  expect(ruleHandler(8, new ValidatorLite({ max: 5 }))).toBe(true);
  expect(ruleHandler(8, new ValidatorLite({ max: 9 }))).toBe(false);
});
