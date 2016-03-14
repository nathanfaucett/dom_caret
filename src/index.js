var environment = require("environment"),
    focusNode = require("focus_node"),
    getActiveElement = require("get_active_element"),
    isTextInputElement = require("is_text_input_element");


var domCaret = exports,

    window = environment.window,
    document = environment.document,

    getNodeCaretPosition, setNodeCaretPosition;



domCaret.get = function(node) {
    var activeElement = getActiveElement(),
        isFocused = activeElement === node,
        selection;

    if (isTextInputElement(node)) {
        if (!isFocused) {
            focusNode(node);
        }
        selection = getNodeCaretPosition(node);
        if (!isFocused) {
            focusNode(activeElement);
        }
        return selection;
    } else {
        return {
            start: 0,
            end: 0
        };
    }
};

domCaret.set = function(node, start, end) {
    var activeElement, isFocused;

    if (isTextInputElement(node)) {
        activeElement = getActiveElement();
        isFocused = activeElement === node;

        if (!isFocused) {
            focusNode(node);
        }
        setNodeCaretPosition(node, start, end === undefined ? start : end);
        if (!isFocused) {
            focusNode(activeElement);
        }
    }
};

if (!!window.getSelection) {
    getNodeCaretPosition = function getNodeCaretPosition(node) {
        return {
            start: node.selectionStart,
            end: node.selectionEnd
        };
    };
    setNodeCaretPosition = function setNodeCaretPosition(node, start, end) {
        node.setSelectionRange(start, end);
    };
} else if (document.selection && document.selection.createRange) {
    getNodeCaretPosition = function getNodeCaretPosition(node) {
        var range = document.selection.createRange(),
            position;

        range.moveStart("character", -node.value.length);
        position = range.text.length;

        return {
            start: position,
            end: position
        };
    };
    setNodeCaretPosition = function setNodeCaretPosition(node, start, end) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveStart("character", start);
        range.moveEnd("character", end);
        range.select();
    };
} else {
    getNodeCaretPosition = function getNodeCaretPosition() {
        return {
            start: 0,
            end: 0
        };
    };
    setNodeCaretPosition = function setNodeCaretPosition() {};
}
