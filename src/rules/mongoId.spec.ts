import { ValidatorLite } from '../mock/validator-lite.mock'

import { mongoId } from "./mongoId.rule";

test("rules:mongoId", function (): void {
  const ruleHandler = mongoId().handler;
  expect(ruleHandler("5c33010638eb95186574b64a")).toBe(true);
  expect(ruleHandler("1945690")).toBe(false);
});
