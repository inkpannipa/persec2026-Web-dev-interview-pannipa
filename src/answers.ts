// 1. ตรวจสอบว่าวงเล็บเปิดและปิดถูกคู่กันหรือไม่
export function isValidBrackets(input: string): boolean {
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const stack: string[] = [];

  for (const char of input) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (pairs[char]) {
      if (stack.pop() !== pairs[char]) return false;
    } else {
      return false;
    }
  }

  return stack.length === 0;
}

// 2. เรียง string แบบ natural sort (ตัวเลขในข้อความจะถูกเทียบเป็นตัวเลข)
export function sortCodes(items: string[]): string[] {
  return [...items].sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }),
  );
}

// 3. ค้นหาคำโดยให้คำที่ขึ้นต้นด้วย search มาก่อน ตามด้วยคำที่เจอตรงกลาง/ท้าย
export function autocomplete(
  search: string,
  items: string[],
  maxResult: number,
): string[] {
  if (search.length === 0 || maxResult <= 0) return [];

  const keyword = search.toLowerCase();

  return items
    .map((item, originalIndex) => ({
      item,
      originalIndex,
      foundAt: item.toLowerCase().indexOf(keyword),
    }))
    .filter((result) => result.foundAt !== -1)
    .sort(
      (a, b) =>
        a.foundAt - b.foundAt || a.originalIndex - b.originalIndex,
    )
    .slice(0, maxResult)
    .map((result) => result.item);
}

const romanValues: ReadonlyArray<readonly [number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

// 4.1 แปลงเลขจำนวนเต็มเป็น Roman Numerals
export function intToRoman(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new RangeError("value must be an integer between 1 and 3999");
  }

  let remaining = value;
  let result = "";

  for (const [number, symbol] of romanValues) {
    while (remaining >= number) {
      result += symbol;
      remaining -= number;
    }
  }

  return result;
}

// 4.2 แปลง Roman Numerals เป็นเลขจำนวนเต็ม
export function romanToInt(roman: string): number {
  const input = roman.toUpperCase();
  const values: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  if (!input || [...input].some((char) => values[char] === undefined)) {
    throw new Error("invalid Roman numeral");
  }

  let result = 0;
  for (let index = 0; index < input.length; index += 1) {
    const current = values[input[index]];
    const next = values[input[index + 1]] ?? 0;
    result += current < next ? -current : current;
  }

  // เช็กซ้ำเพื่อไม่ให้รูปแบบที่ผิด เช่น IIII หรือ VX ผ่านเข้ามา
  if (result < 1 || result > 3999 || intToRoman(result) !== input) {
    throw new Error("invalid Roman numeral");
  }

  return result;
}

// 5. เรียงตัวเลขแต่ละหลักจากมากไปน้อย
export function descendingDigits(value: number): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new RangeError("value must be a positive integer");
  }

  return Number([...String(value)].sort((a, b) => Number(b) - Number(a)).join(""));
}

// 6. สร้างลำดับ Tribonacci
export function tribonacci(initial: number[], count: number): number[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer");
  }
  if (initial.length > 3 || initial.some((value) => !Number.isInteger(value))) {
    throw new Error("initial must contain 0 to 3 integers");
  }
  if (count === 0) return [];

  const result = initial.slice(0, count);
  while (result.length < Math.min(3, count)) result.push(0);

  while (result.length < count) {
    const lastThree = result.slice(-3);
    result.push(lastThree.reduce((sum, value) => sum + value, 0));
  }

  return result;
}
