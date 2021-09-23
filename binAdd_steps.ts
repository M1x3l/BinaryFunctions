import { green, magenta } from 'cli-color';
import { createInterface as readline } from 'readline';
const rl = readline({ input: process.stdin, output: process.stdout });

const [_, _file, n0, n1] = process.argv;

if (n0 || n1) {
	if (!n0 || !n1) process.exit(-1);

	[n0, n1].forEach((e) => {
		if (/[^01]/.test(e)) {
			console.log(`${e} is not a binary number`);
			process.exit(-1);
		}
	});
	binAddSteps(n0, n1);
	process.exit();
}

console.log('Input only binary numbers');
rl.question('1 > ', (param0) => {
	param0 = param0.replace(/^0*/, '');
	if (/[^01]/.test(param0)) {
		console.log('Not a binary Number!');
		process.exit();
	}
	rl.question('2 > ', (param1) => {
		binAddSteps(param0, param1);
		process.exit();
	});
});

function binAddSteps(n0: string, n1: string) {
	[n0, n1] = [n0, n1].map((e) => e.replace(/^0*/, ''));
	if (/[^01]/.test(n1)) {
		console.log('Not a binary Number!');
		process.exit();
	}
	const maxLength = Math.max(n0.length, n1.length);

	const numbers: [number[], number[]] = [
		n0
			.split('')
			.map((e) => parseInt(e))
			.reverse(),
		n1
			.split('')
			.map((e) => parseInt(e))
			.reverse(),
	];

	numbers.forEach((e) => {
		e.push(...new Array(maxLength - e.length).fill(0));
	});

	const carry = new Array(maxLength).fill(0);

	for (let i = 0; i < carry.length; i++) {
		const [n1, n2, n3] = [...getDigitsInCol(numbers, i), carry[i - 1] || 0];
		carry[i] = n1 + n2 + n3 > 1 ? 1 : 0;
	}

	console.log();

	const [n1Str, n2Str, carryStr, outputStr] = [
		n0.padStart(maxLength + 1),
		n1.padStart(maxLength + 1),
		carry.reverse().join(''),
		(parseInt(n0, 2) + parseInt(n1, 2)).toString(2),
	];

	console.log(
		` ${n1Str} ${green(`= ${parseInt(n1Str, 2)}`)}
		+${n2Str} ${green(`= ${parseInt(n2Str, 2)}`)}
		 ${magenta(carryStr)}
		${'—'.repeat(maxLength + 2)}
		 ${outputStr} ${green(`= ${parseInt(outputStr, 2)}`)}`.replace(/\t/g, '')
	);
}

/** Returns the two numbers at ``col`` with `0` being the `LSB`*/
function getDigitsInCol(numbers: [number[], number[]], col: number) {
	return [numbers[0][col] || 0, numbers[1][col] || 0];
}
