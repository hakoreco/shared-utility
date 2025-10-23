import { expect, test } from "vitest";

import { mergeClasses } from "@/index";

test("mergeClasses", () => {
  expect(mergeClasses(".example")).toBe(".example");
  expect(mergeClasses(".example", ".example2")).toBe(".example .example2");
  expect(mergeClasses()).toBe("");
});
