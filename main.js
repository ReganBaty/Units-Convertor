var pounds = function (n) {
    var regex = /((?:\d*\.*)\d+){1}\s*(?:lbs|pounds)/i;
    var match = n.textContent.match(regex);
    if (!match)
        return { match: match };
    var num = parseFloat(match[1]);
    var kgs = (num / 2.2046).toFixed(3);
    var title = "".concat(kgs, " kgs");
    return {
        match: match,
        title: title
    };
};
var feet = function (n) {
    var regex = /((?:\d*\.*)\d+){1}\s*(?:ft|feet|foot)/i;
    var match = n.textContent.match(regex);
    if (!match)
        return { match: match };
    var num = parseFloat(match[1]);
    var meters = (num / 3.2808).toFixed(3);
    var title = "".concat(meters, " m");
    return {
        match: match,
        title: title
    };
};
var tests = [pounds, feet];
var update = function (n, t) {
    var _a;
    var testResult = t(n);
    var index = (_a = testResult.match) === null || _a === void 0 ? void 0 : _a.index;
    if (testResult.match && index != -1) {
        var span = document.createElement("span");
        var parentNode = n.parentNode;
        var before = document.createTextNode(n.textContent.slice(0, index));
        var after = document.createTextNode(n.textContent.slice(index + testResult.match[0].length));
        span.innerText = n.textContent.slice(index, index + testResult.match[0].length);
        span.title = testResult.title;
        parentNode.replaceChild(span, n);
        if (span.previousSibling) {
            span.previousSibling.after(before);
        }
        else {
            parentNode.prepend(before);
        }
        if (span.nextSibling) {
            span.nextSibling.before(after);
        }
        else {
            parentNode.append(after);
        }
        if (after.textContent.trim()) {
            update(span.nextSibling, t);
        }
    }
};
tests.forEach(function (t) {
    var nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var node = nodeIterator.nextNode();
    while (node) {
        nodes.push(node);
        node = nodeIterator.nextNode();
    }
    nodes.forEach(function (n) {
        update(n, t);
    });
});
//# sourceMappingURL=main.js.map