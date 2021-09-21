import { cyan, green, magenta } from 'cli-color';
import { createInterface as readline } from 'readline';

const rl = readline({ input: process.stdin, output: process.stdout });

rl.question('> ', (answer) => {
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

	console.log(magenta(`${original} = ${bits}`));
}
