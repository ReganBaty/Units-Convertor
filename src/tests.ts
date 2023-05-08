export type TestResult = {
  match?: RegExpMatchArray | null;
  title?: string;
};

const pounds = (n: Node): TestResult => {
  const regex = /((?:\d*\.*)\d+){1}\s*(?:lbs|pounds)/i;
  const match = n.textContent?.match(regex);

  if (!match) return { match };

  const num = parseFloat(match[1]);
  const kgs = (num / 2.2046).toFixed(3);

  const title = `${kgs} kgs`;

  return {
    match: match,
    title,
  };
};

const feet = (n: Node): TestResult => {
  const regex = /((?:\d*\.*)\d+){1}\s*(?:ft|feet|foot)/i;
  const match = n.textContent?.match(regex);

  if (!match) return { match };

  const num = parseFloat(match[1]);
  const meters = (num / 3.2808).toFixed(3);

  const title = `${meters} m`;

  return {
    match: match,
    title,
  };
};

export const tests = [pounds, feet];
