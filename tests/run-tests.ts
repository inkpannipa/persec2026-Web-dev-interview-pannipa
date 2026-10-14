import {
  autocomplete,
  descendingDigits,
  intToRoman,
  isValidBrackets,
  romanToInt,
  sortCodes,
  tribonacci,
} from "../src/answers";

function equal<T>(actual: T, expected: T, name: string): void {
  const actualText = JSON.stringify(actual);
  const expectedText = JSON.stringify(expected);
  if (actualText !== expectedText) {
    throw new Error(`${name}: expected ${expectedText}, got ${actualText}`);
  }
  console.log(`PASS: ${name}`);
}

equal(isValidBrackets("()"), true, "valid brackets");
equal(isValidBrackets("([{}])"), true, "nested brackets");
equal(isValidBrackets("([)]"), false, "wrong bracket order");
equal(isValidBrackets("([[{}]]]"), false, "extra closing bracket");

equal(sortCodes(["TH19", "SG20", "TH2"]), ["SG20", "TH2", "TH19"], "sort codes");
equal(
  sortCodes(["TH10", "TH3Netflix", "TH1", "TH7"]),
  ["TH1", "TH3Netflix", "TH7", "TH10"],
  "sort codes with text",
);

equal(
  autocomplete("th", ["Mother", "Think", "Worthy", "Apple", "Android"], 2),
  ["Think", "Mother"],
  "autocomplete",
);

equal(intToRoman(1989), "MCMLXXXIX", "integer to Roman");
equal(intToRoman(68), "LXVIII", "integer to Roman 68");
equal(romanToInt("CIX"), 109, "Roman to integer");
equal(romanToInt("MM"), 2000, "Roman to integer 2000");

equal(descendingDigits(3008), 8300, "descending digits with zero");
equal(descendingDigits(1989), 9981, "descending digits");

equal(tribonacci([1, 3, 5], 5), [1, 3, 5, 9, 17], "tribonacci 1");
equal(tribonacci([2, 2, 2], 3), [2, 2, 2], "tribonacci 2");
equal(tribonacci([10, 10, 10], 4), [10, 10, 10, 30], "tribonacci 3");
equal(tribonacci([], 5), [0, 0, 0, 0, 0], "tribonacci empty initial");

console.log("All tests passed");
