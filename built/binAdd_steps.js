"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_color_1 = require("cli-color");
var readline_1 = require("readline");
var rl = readline_1.createInterface({ input: process.stdin, output: process.stdout });
console.log('Input only binary numbers');
rl.question('1 > ', function (param0) {
    param0 = param0.replace(/^0*/, '');
    if (/[^01]/.test(param0)) {
        console.log('Not a binary Number!');
        process.exit();
    }
    rl.question('2 > ', function (param1) {
        param1 = param1.replace(/^0*/, '');
        if (/[^01]/.test(param1)) {
            console.log('Not a binary Number!');
            process.exit();
        }
        var maxLength = Math.max(param0.length, param1.length);
        var numbers = [
            param0
                .split('')
                .map(function (e) { return parseInt(e); })
                .reverse(),
            param1
                .split('')
                .map(function (e) { return parseInt(e); })
                .reverse(),
        ];
        numbers.forEach(function (e) {
            e.push.apply(e, new Array(maxLength - e.length).fill(0));
        });
        var carry = new Array(maxLength).fill(0);
        for (var i = 0; i < carry.length; i++) {
            var _a = __spreadArrays(getDigitsInCol(numbers, i), [carry[i - 1] || 0]), n1 = _a[0], n2 = _a[1], n3 = _a[2];
            carry[i] = n1 + n2 + n3 > 1 ? 1 : 0;
        }
        var output = new Array(maxLength + 1).fill(0);
        for (var i = 0; i < output.length; i++) {
            var _b = __spreadArrays(getDigitsInCol(numbers, i), [carry[i - 1] || 0]), n1 = _b[0], n2 = _b[1], n3 = _b[2];
            output[i] = n1 + n2 + n3 != 2 ? 1 : 0;
        }
        console.log();
        var _c = [
            param0.padStart(maxLength + 1),
            param1.padStart(maxLength + 1),
            carry.reverse().join(''),
            output.reverse().join(''),
        ], n1Str = _c[0], n2Str = _c[1], carryStr = _c[2], outputStr = _c[3];
        console.log((" " + n1Str + " " + cli_color_1.green("= " + parseInt(n1Str, 2)) + "\n\t\t\t+" + n2Str + " " + cli_color_1.green("= " + parseInt(n2Str, 2)) + "\n\t\t\t " + cli_color_1.magenta(carryStr) + "\n\t\t\t" + '—'.repeat(maxLength + 2) + "\n\t\t\t " + outputStr + " " + cli_color_1.green("= " + parseInt(outputStr, 2))).replace(/\t/g, ''));
        process.exit();
    });
});
/** Returns the two numbers at ``col`` with `0` being the `LSB`*/
function getDigitsInCol(numbers, col) {
    return [numbers[0][col] || 0, numbers[1][col] || 0];
}
