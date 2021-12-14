const fs = require('fs');

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	const input = strInput.split('\n\n');
	let chain = input[0];

	let map = new Map();

	input[1].split('\n').forEach(ins => {
		let insertion = ins.split(' -> ');
		map[insertion[0]] = insertion[1];
	})

	const steps = 10;

	for (let step = 0; step < steps; step++) {
		let i = 0;
		let pair = '';
		while (i < chain.length - 1) {
			pair = chain.slice(i, i + 2);
			if (map[pair]) {
				chain = chain.slice(0, i + 1) + map[pair] + chain.slice(i + 1);
				i += 1;
			}
			i += 1;
		}
	}

	let max = 0, min = +Infinity;
	let freqs = new Map();
	for (let i = 0; i < chain.length; i++) {
		if (!freqs[chain[i]]) freqs[chain[i]] = 0;
		freqs[chain[i]] += 1;
		max = Math.max(freqs[chain[i]], max);
	}
	for (const element in freqs) {
		min = Math.min(freqs[element], min);
	}
	result = max - min;

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 14:', solution);