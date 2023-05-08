import { tests, TestResult } from "./tests";

const update = (node: Node, test: (n: Node) => TestResult) => {
  let testResult = test(node);

  const index = testResult.match?.index;

  if (testResult.match && index != -1) {
    const span = document.createElement("span");
    const parentNode = node.parentNode;
    const before = document.createTextNode(node.textContent.slice(0, index));
    const after = document.createTextNode(
      node.textContent.slice(index + testResult.match[0].length)
    );
    span.innerText = node.textContent.slice(
      index,
      index + testResult.match[0].length
    );
    span.title = testResult.title;

    parentNode.replaceChild(span, node);

    if (span.previousSibling) {
      span.previousSibling.after(before);
    } else {
      parentNode.prepend(before);
    }

    if (span.nextSibling) {
      span.nextSibling.before(after);
    } else {
      parentNode.append(after);
    }

    if (after.textContent.trim()) {
      update(span.nextSibling, test);
    }
  }
};

const t0 = performance.now();
tests.forEach((t) => {
  let nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  // Move iterator into array to avoid working on modified document
  let nodes: Node[] = [];

  let node = nodeIterator.nextNode();
  while (node) {
    nodes.push(node);
    node = nodeIterator.nextNode();
  }
  nodes.forEach((n) => {
    update(n, t);
  });
});

const t1 = performance.now();
console.log(`Document scanning took ${t1 - t0} milliseconds.`);
