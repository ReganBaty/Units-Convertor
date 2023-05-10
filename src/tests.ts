export type TestResult = {
  match?: RegExpMatchArray | null;
  title?: string;
};

type Test = {
  regex: RegExp;
  UnitConvertor: (num: number) => string;
};

const pounds = {
  regex: /((?:\d*\.*)\d+){1}\s*(?:lb|pound)/i,
  UnitConvertor: (num: number) => {
    const kgs = (num / 2.2046).toFixed(3);
    return `${kgs} kgs`;
  },
};

const feet = {
  regex: /((?:\d*\.*)\d+){1}\s*(?:ft|feet|foot)/i,

  UnitConvertor: (num: number) => {
    const meters = (num / 3.2808).toFixed(3);
    return `${meters} m`;
  },
};

const cups = {
  regex: /((?:\d*\.*)\d+){1}\s*(?:cup)/i,
  UnitConvertor: (num: number) => {
    const ml = (num * 250).toFixed(0);
    return `${ml} ml`;
  },
};

const teaspoons = {
  regex: /((?:\d*\.*)\d+){1}\s*(?:tsp|teaspoon)/i,
  UnitConvertor: (num: number) => {
    // Good system
    const ml = (num * 4.928922).toFixed(0);
    return `${ml} ml`;
  },
};

const tableSpoons = {
  regex: /((?:\d*\.*)\d+){1}\s*(?:tbsp|tablespoon)/i,
  UnitConvertor: (num: number) => {
    // Good system
    const ml = (num * 14.8).toFixed(0);
    return `${ml} ml`;
  },
};

const MakeTest = (test: Test) => {
  return (n: Node): TestResult => {
    const regex = test.regex;
    const match = n.textContent?.match(regex);

    if (!match) return { match };
    const num = parseFloat(match[1]);

    const title = test.UnitConvertor(num);

    return {
      match: match,
      title,
    };
  };
};

export const tests = [
  MakeTest(pounds),
  MakeTest(feet),
  MakeTest(cups),
  MakeTest(teaspoons),
  MakeTest(tableSpoons),
];
