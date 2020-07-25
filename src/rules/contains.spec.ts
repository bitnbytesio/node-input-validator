import {ValidatorLite} from '../mock/validator-lite.mock'
import { contains } from "./contains.rule";

test("rules:contains", function (): void {
  const ruleHandler = contains(["contains"]).handler;
  expect(
    ruleHandler(
      "This package is awesome.",
      new ValidatorLite({ contains: "package" }),
    )).toBe(true);
  expect(
    ruleHandler("Yes, Node is awesome", new ValidatorLite({ contains: "yes" }))).toBe(false)
  
});
