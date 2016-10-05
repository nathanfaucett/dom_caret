var domCaret = global.domCaret = require("../..");


var input = document.getElementById("input");


input.onclick = function() {
    console.log(domCaret.get(input));
};


domCaret.set(input, 6);
domCaret.get(input);

domCaret.set(input, 0, input.value.length);
domCaret.get(input);