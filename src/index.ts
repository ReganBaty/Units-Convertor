import { tests, TestResult } from "./tests";

const stuff = (node: Node) => {
  let nodes: Node[] = [node];

  tests.forEach((t) => {
    const nodeRuns = nodes.map((n) => n);
    let added = 0;
    nodes.forEach((n, i) => {
      if (n.nodeType == Node.TEXT_NODE) {
        const nodes = runner(n, t);
        nodeRuns.splice(i + added, 1, ...nodes);
        added += nodes.length - 1;
      }
    });
    nodes = nodeRuns;
  });

  const parent = node as Element;

  parent.replaceWith(...nodes);
};

const runner = (node: Node, test: (n: string) => TestResult): Node[] => {
  const text = node.textContent;
  let testResult = test(text);
  const nodes: Node[] = [];

  const index = testResult.match?.index;

  // No matches
  if (!testResult.match || index == -1) {
    return [node];
  }

  const span = document.createElement("span");
  span.innerText = node.textContent.slice(
    index,
    index + testResult.match[0].length
  );
  span.title = testResult.title;

  const beforeText = node.textContent.slice(0, index);
  if (beforeText) {
    const before = document.createTextNode(beforeText);
    nodes.push(before);
  }

  nodes.push(span);

  const afterText = node.textContent.slice(index + testResult.match[0].length);

  if (afterText) {
    const after = document.createTextNode(afterText);

    const results = runner(after, test);
    nodes.push(...results);
  }

  return nodes;
};

const t0 = performance.now();
const nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_TEXT
);

// Move iterator into array to avoid working on modified document
const nodes: Node[] = [];

let node = nodeIterator.nextNode();
while (node) {
  nodes.push(node);
  node = nodeIterator.nextNode();
}

nodes.forEach((n) => stuff(n));

const t1 = performance.now();
console.log(`Document scanning took ${t1 - t0} milliseconds.`);
