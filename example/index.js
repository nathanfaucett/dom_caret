(function(dependencies, chunks, undefined, global) {
    
    var cache = [],
        cacheCallbacks = {},
        locked = false;
    

    function Module() {
        this.id = null;
        this.filename = null;
        this.dirname = null;
        this.exports = {};
        this.loaded = false;
    }

    Module.prototype.require = require;

    function require(index) {
        var module = cache[index],
            callback, exports;

        if (module !== undefined) {
            return module.exports;
        } else {
            callback = dependencies[index];

            cache[index] = module = new Module();
            exports = module.exports;

            callback.call(exports, require, exports, module, undefined, global);
            module.loaded = true;

            return module.exports;
        }
    }

    require.resolve = function(path) {
        return path;
    };

    
    require.async = function async(index, callback) {
        var module = cache[index],
            callbacks, node;

        if (module) {
            callback(module.exports);
        } else if ((callbacks = cacheCallbacks[index])) {
            callbacks[callbacks.length] = callback;
        } else {
            node = document.createElement("script");
            callbacks = cacheCallbacks[index] = [callback];

            node.type = "text/javascript";
            node.charset = "utf-8";
            node.async = true;

            function onLoad() {
                var i = -1,
                    il = callbacks.length - 1;

                locked = true;

                while (i++ < il) {
                    callbacks[i](require(index));
                }
                delete cacheCallbacks[index];
            }

            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0)) {
                node.attachEvent("onreadystatechange", onLoad);
            } else {
                node.addEventListener("load", onLoad, false);
            }

            node.src = chunks[index];
            locked = false;

            document.head.appendChild(node);
        }
    };

    global["lsYt3cHK-qBE3-45WH-F9Kh-i1p9UYNKQGfuE"] = function(asyncDependencies) {
        var i, il, dependency, index;

        if (!locked) {
            i = -1;
            il = asyncDependencies.length - 1;

            while (i++ < il) {
                dependency = asyncDependencies[i];
                index = dependency[0];

                if (dependencies[index] === null) {
                    dependencies[index] = dependency[1];
                }
            }
        }
    };

    

    if (typeof(define) === "function" && define.amd) {
        define([], function() {
            return require(0);
        });
    } else if (typeof(module) !== "undefined" && module.exports) {
        module.exports = require(0);
    } else {
        
        require(0);
        
    }
}([
function(require, exports, module, undefined, global) {
/*/var/www/html/node/_dom/dom_caret/example/src/index.js*/

var domCaret = global.domCaret = require(1);


var input = document.getElementById("input");


input.onclick = function() {
    console.log(domCaret.get(input));
};


domCaret.set(input, 6);
domCaret.get(input);

domCaret.set(input, 0, input.value.length);
domCaret.get(input);

},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/dom_caret@0.0.1/src/index.js*/

var environment = require(2),
    focusNode = require(3),
    getActiveElement = require(4),
    isTextInputElement = require(5);


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


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/environment@0.0.1/src/index.js*/

var environment = exports,

    hasWindow = typeof(window) !== "undefined",
    userAgent = hasWindow ? window.navigator.userAgent : "";


environment.worker = typeof(importScripts) !== "undefined";

environment.browser = environment.worker || !!(
    hasWindow &&
    typeof(navigator) !== "undefined" &&
    window.document
);

environment.node = !environment.worker && !environment.browser;

environment.mobile = environment.browser && /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

environment.window = (
    hasWindow ? window :
    typeof(global) !== "undefined" ? global :
    typeof(self) !== "undefined" ? self : {}
);

environment.pixelRatio = environment.window.devicePixelRatio || 1;

environment.document = typeof(document) !== "undefined" ? document : {};


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/focus_node@0.0.1/src/index.js*/

var isNode = require(6);


module.exports = focusNode;


function focusNode(node) {
    if (isNode(node) && node.focus) {
        try {
            node.focus();
        } catch (e) {}
    }
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/get_active_element@0.0.1/src/index.js*/

var isDocument = require(13),
    environment = require(2);


var document = environment.document;


module.exports = getActiveElement;


function getActiveElement(ownerDocument) {
    ownerDocument = isDocument(ownerDocument) ? ownerDocument : document;

    try {
        return ownerDocument.activeElement || ownerDocument.body;
    } catch (e) {
        return ownerDocument.body;
    }
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_text_input_element@0.0.1/src/index.js*/

var isNullOrUndefined = require(8);


var reIsSupportedInputType = new RegExp("^\\b(" + [
    "color", "date", "datetime", "datetime-local", "email", "month", "number",
    "password", "range", "search", "tel", "text", "time", "url", "week"
].join("|") + ")\\b$");


module.exports = isTextInputElement;


function isTextInputElement(value) {
    return !isNullOrUndefined(value) && (
        (value.nodeName === "INPUT" && reIsSupportedInputType.test(value.type)) ||
        value.nodeName === "TEXTAREA"
    );
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_node@0.0.1/src/index.js*/

var isString = require(7),
    isNullOrUndefined = require(8),
    isNumber = require(9),
    isFunction = require(10);


var isNode;


if (typeof(Node) !== "undefined" && isFunction(Node)) {
    isNode = function isNode(value) {
        return value instanceof Node;
    };
} else {
    isNode = function isNode(value) {
        return (!isNullOrUndefined(value) &&
            isNumber(value.nodeType) &&
            isString(value.nodeName)
        );
    };
}


module.exports = isNode;


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_string@0.0.1/src/index.js*/

module.exports = isString;


function isString(value) {
    return typeof(value) === "string" || false;
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_null_or_undefined@0.0.1/src/index.js*/

var isNull = require(11),
    isUndefined = require(12);


module.exports = isNullOrUndefined;

/**
  isNullOrUndefined accepts any value and returns true
  if the value is null or undefined. For all other values
  false is returned.
  
  @param {Any}        any value to test
  @returns {Boolean}  the boolean result of testing value

  @example
    isNullOrUndefined(null);   // returns true
    isNullOrUndefined(undefined);   // returns true
    isNullOrUndefined("string");    // returns false
**/
function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_number@0.0.1/src/index.js*/

module.exports = isNumber;


function isNumber(value) {
    return typeof(value) === "number" || false;
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_function@0.0.1/src/index.js*/

var objectToString = Object.prototype.toString,
    isFunction;


if (objectToString.call(function() {}) === "[object Object]") {
    isFunction = function isFunction(value) {
        return value instanceof Function;
    };
} else if (typeof(/./) === "function" || (typeof(Uint8Array) !== "undefined" && typeof(Uint8Array) !== "function")) {
    isFunction = function isFunction(value) {
        return objectToString.call(value) === "[object Function]";
    };
} else {
    isFunction = function isFunction(value) {
        return typeof(value) === "function" || false;
    };
}


module.exports = isFunction;


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_null@0.0.1/src/index.js*/

module.exports = isNull;


function isNull(value) {
    return value === null;
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_undefined@0.0.1/src/index.js*/

module.exports = isUndefined;


function isUndefined(value) {
    return value === void(0);
}


},
function(require, exports, module, undefined, global) {
/*@nathanfaucett/is_document@0.0.1/src/index.js*/

var isNode = require(6);


module.exports = isDocument;


function isDocument(value) {
    return isNode(value) && value.nodeType === 9;
}


}], {}, void(0), (new Function("return this;"))()));
