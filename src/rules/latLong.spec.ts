
import { Messages } from "../messages";
import { latLong } from "./latLong.rule";

test("rules:latLong", function (): void {
  const ruleHandler = latLong().handler;
  expect(ruleHandler("30.483997,76.593948")).toBe(true);
  expect(ruleHandler("30.48399776.593948")).toBe(false);
  expect(ruleHandler("Yes, Node is awesome")).toBe(false);
  expect(ruleHandler(null)).toBe(false);
});

test("message should exists", () => {
  expect(Messages.en_US.messages).toHaveProperty('latLong');
});
