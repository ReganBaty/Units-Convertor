export type TestResult = {
  match?: RegExpMatchArray | null;
  title?: string;
};

type Test = {
  regex: RegExp;
  UnitConvertor: (num: number) => string;
};

const pounds = {
  regex: /((?:\d*\.*)\d+){1}\s*(?:lbs|pounds)/i,
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

export const tests = [MakeTest(pounds), MakeTest(feet)];
