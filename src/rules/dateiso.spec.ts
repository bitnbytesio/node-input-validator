import { Messages } from "../messages/index.js";
import { dateiso, iso8601 } from "./dateiso.rule.js";

test("rules:dateiso", function (): void {
  const ruleHandler = dateiso().handler;
  expect(ruleHandler("2021-01-21T11:15:00+00:00")).toBe(true);
  expect(iso8601().handler("2021-01-21T11:15:00+00:00")).toBe(true);
  expect(ruleHandler("2021-01-21T11:15:00Z")).toBe(true);
  expect(ruleHandler("20210121T111500Z")).toBe(true);
  expect(ruleHandler(["20210121T111500Z"])).toBe(false);
});


test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('dateiso');
});
