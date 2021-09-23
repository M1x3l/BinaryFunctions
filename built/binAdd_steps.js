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
var _a = process.argv, _ = _a[0], _file = _a[1], n0 = _a[2], n1 = _a[3];
if (n0 || n1) {
    if (!n0 || !n1)
        process.exit(-1);
    [n0, n1].forEach(function (e) {
        if (/[^01]/.test(e)) {
            console.log(e + " is not a binary number");
            process.exit(-1);
        }
    });
    binAddSteps(n0, n1);
    process.exit();
}
console.log('Input only binary numbers');
rl.question('1 > ', function (param0) {
    param0 = param0.replace(/^0*/, '');
    if (/[^01]/.test(param0)) {
        console.log('Not a binary Number!');
        process.exit();
    }
    rl.question('2 > ', function (param1) {
        binAddSteps(param0, param1);
        process.exit();
    });
});
function binAddSteps(n0, n1) {
    var _a;
    _a = [n0, n1].map(function (e) { return e.replace(/^0*/, ''); }), n0 = _a[0], n1 = _a[1];
    if (/[^01]/.test(n1)) {
        console.log('Not a binary Number!');
        process.exit();
    }
    var maxLength = Math.max(n0.length, n1.length);
    var numbers = [
        n0
            .split('')
            .map(function (e) { return parseInt(e); })
            .reverse(),
        n1
            .split('')
            .map(function (e) { return parseInt(e); })
            .reverse(),
    ];
    numbers.forEach(function (e) {
        e.push.apply(e, new Array(maxLength - e.length).fill(0));
    });
    var carry = new Array(maxLength).fill(0);
    for (var i = 0; i < carry.length; i++) {
        var _b = __spreadArrays(getDigitsInCol(numbers, i), [carry[i - 1] || 0]), n1_1 = _b[0], n2 = _b[1], n3 = _b[2];
        carry[i] = n1_1 + n2 + n3 > 1 ? 1 : 0;
    }
    console.log();
    var _c = [
        n0.padStart(maxLength + 1),
        n1.padStart(maxLength + 1),
        carry.reverse().join(''),
        (parseInt(n0, 2) + parseInt(n1, 2)).toString(2),
    ], n1Str = _c[0], n2Str = _c[1], carryStr = _c[2], outputStr = _c[3];
    console.log((" " + n1Str + " " + cli_color_1.green("= " + parseInt(n1Str, 2)) + "\n\t\t+" + n2Str + " " + cli_color_1.green("= " + parseInt(n2Str, 2)) + "\n\t\t " + cli_color_1.magenta(carryStr) + "\n\t\t" + '—'.repeat(maxLength + 2) + "\n\t\t " + outputStr + " " + cli_color_1.green("= " + parseInt(outputStr, 2))).replace(/\t/g, ''));
}
/** Returns the two numbers at ``col`` with `0` being the `LSB`*/
function getDigitsInCol(numbers, col) {
    return [numbers[0][col] || 0, numbers[1][col] || 0];
}
