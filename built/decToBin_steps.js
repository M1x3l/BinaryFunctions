"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_color_1 = require("cli-color");
var readline_1 = require("readline");
var rl = readline_1.createInterface({ input: process.stdin, output: process.stdout });
rl.question('> ', function (answer) {
    decToBinSteps(parseInt(answer));
    process.exit();
});
function decToBinSteps(num) {
    var original = num;
    var bits = '';
    var numLength = ("" + num).length;
    while (num != 0) {
        var rem = num % 2;
        console.log(cli_color_1.cyan(("" + num).padEnd(numLength, ' ')) + " / 2   = " + cli_color_1.green(("" + (num = Math.floor(num / 2))).padEnd(numLength, ' ')) + " R: " + cli_color_1.green("" + rem));
        bits = rem + bits;
    }
    console.log(cli_color_1.magenta(original + " = " + bits) + "\nVerification: " + cli_color_1.magenta(parseInt(bits, 2)));
}
