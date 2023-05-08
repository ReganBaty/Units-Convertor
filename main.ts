const pounds = (n: Node) => {
    const regex = /((?:\d*\.*)\d+){1}\s*(?:lbs|pounds)/i;
    const match = n.textContent.match(regex)

    if (!match) return { match }

    const num = parseFloat(match[1]);
    const kgs = (num / 2.2046).toFixed(3)

    const title = `${kgs} kgs`

    return {
        match: match,
        title
    }
}

const feet = (n: Node) => {
    const regex = /((?:\d*\.*)\d+){1}\s*(?:ft|feet|foot)/i;
    const match = n.textContent.match(regex)

    if (!match) return { match }

    const num = parseFloat(match[1]);
    const meters = (num / 3.2808).toFixed(3)

    const title = `${meters} m`

    return {
        match: match,
        title
    }
}

const tests = [pounds, feet]

const update = (n: Node, t: any) => {

    let testResult = t(n)

    const index = testResult.match?.index

    if (testResult.match && index != -1) {
        const span = document.createElement("span");
        const parentNode = n.parentNode
        const before = document.createTextNode(n.textContent.slice(0, index))
        const after = document.createTextNode(n.textContent.slice(index + testResult.match[0].length))
        span.innerText = n.textContent.slice(index, index + testResult.match[0].length)
        span.title = testResult.title

        parentNode.replaceChild(span, n);

        if (span.previousSibling) {
            span.previousSibling.after(before)
        }
        else {
            parentNode.prepend(before)
        }

        if (span.nextSibling) {
            span.nextSibling.before(after)
        }
        else {
            parentNode.append(after)
        }

        if (after.textContent.trim()) {
            update(span.nextSibling, t)
        }
    }
}

tests.forEach((t) => {

    let nodeIterator = document.createNodeIterator(
        document.body,
        NodeFilter.SHOW_TEXT)

    // Move iterator into array to avoid working on modified document
    let nodes: Node[] = [];

    let node = nodeIterator.nextNode()
    while (node) {
        nodes.push(node)
        node = nodeIterator.nextNode()
    }
    nodes.forEach((n) => {
        update(n, t)
    })
})
