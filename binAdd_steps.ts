import { green } from 'cli-color';
import { createInterface as readline } from 'readline';
const rl = readline({ input: process.stdin, output: process.stdout });

console.log('Input only binary numbers');
rl.question('1 > ', (param0) => {
	param0 = param0.replace(/^0*/, '');
	if (/[^01]/.test(param0)) {
		console.log('Not a binary Number!');
		process.exit();
	}
	rl.question('2 > ', (param1) => {
		param1 = param1.replace(/^0*/, '');
		if (/[^01]/.test(param1)) {
			console.log('Not a binary Number!');
			process.exit();
		}
		const maxLength = Math.max(param0.length, param1.length);

		const numbers: [number[], number[]] = [
			param0
				.split('')
				.map((e) => parseInt(e))
				.reverse(),
			param1
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

		const output = new Array(maxLength + 1).fill(0);
		for (let i = 0; i < output.length; i++) {
			const [n1, n2, n3] = [...getDigitsInCol(numbers, i), carry[i - 1] || 0];
			output[i] = n1 + n2 + n3 != 2 ? 1 : 0;
		}

		console.log();

		const [n1Str, n2Str, carryStr, outputStr] = [
			param0.padStart(maxLength + 1),
			param1.padStart(maxLength + 1),
			carry.reverse().join(''),
			output.reverse().join(''),
		];

		console.log(
			` ${n1Str} ${green(`= ${parseInt(n1Str, 2)}`)}
			+${n2Str} ${green(`= ${parseInt(n2Str, 2)}`)}
			 ${carryStr}
			${'—'.repeat(maxLength + 2)}
			 ${outputStr} ${green(`= ${parseInt(outputStr, 2)}`)}`.replace(/\t/g, '')
		);
		process.exit();
	});
});

/** Returns the two numbers at ``col`` with `0` being the `LSB`*/
function getDigitsInCol(numbers: [number[], number[]], col: number) {
	return [numbers[0][col] || 0, numbers[1][col] || 0];
}
