import { arrayCleaning } from "./array-cleaning";

export type ClassNameCandidate = string | false | null | undefined;

/**
 * クラス候補のリストをまとめて結合し、 falsy な要素を除去した文字列を返す。
 *
 * @param classes - クラス名または falsy を含む可変長引数
 * @returns スペース区切りで結合されたクラス名
 */
export function mergeClasses(...classes: ClassNameCandidate[]): string {
  return arrayCleaning<ClassNameCandidate>(classes).join(" ");
}
