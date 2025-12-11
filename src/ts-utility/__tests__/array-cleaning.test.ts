import { expect, test } from "vitest";
import { arrayCleaning } from "@/ts-utility";

test("undefinedやnull、falseといったデータを配列から省く", () => {
  expect(arrayCleaning([0, 1, 2, 3])).toEqual([0, 1, 2, 3]);
  expect(arrayCleaning([undefined, "a", null, undefined, "b", "c"])).toEqual([
    "a",
    "b",
    "c",
  ]);
  expect(arrayCleaning(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  expect(arrayCleaning([1, 2, null, 3])).toEqual([1, 2, 3]);
});
