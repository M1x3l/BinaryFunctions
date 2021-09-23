import { cyan, green, magenta } from 'cli-color';
import { createInterface as readline } from 'readline';

const [_, _file, n0] = process.argv;

if (n0) {
	if (/[^\d]/.test(n0)) process.exit(-1);
	decToBinSteps(parseInt(n0));
	process.exit();
}

const rl = readline({ input: process.stdin, output: process.stdout });

rl.question('> ', (answer) => {
	if (/[^\d]/.test(n0)) {
		console.log(`${answer} is not a decimal number`);
		process.exit();
	}
	decToBinSteps(parseInt(answer));
	process.exit();
});

function decToBinSteps(num: number): void {
	const original = num;
	let bits: string = '';

	const numLength = `${num}`.length;

	while (num != 0) {
		const rem = num % 2;
		console.log(
			`${cyan(`${num}`.padEnd(numLength, ' '))} / 2   = ${green(
				`${(num = Math.floor(num / 2))}`.padEnd(numLength, ' ')
			)} R: ${green(`${rem}`)}`
		);

		bits = rem + bits;
	}

	console.log(
		`${magenta(`${original} = ${bits}`)}\nVerification: ${magenta(
			parseInt(bits, 2)
		)}`
	);
}
