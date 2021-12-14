const fs = require('fs');

const makeStep = (freqs, map) => {
	let result = {};
	for (const pair in map) result[pair] = 0;
	for (const pair in freqs) {
		let newPairs = map[pair];
		result[newPairs[0]] += freqs[pair];
		result[newPairs[1]] += freqs[pair];
	}
	return result;
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	const input = strInput.split('\n\n');
	let chain = input[0];

	let map = new Map();

	input[1].split('\n').forEach(ins => {
		let insertion = ins.split(' -> ');
		map[insertion[0]] = [insertion[0][0] + insertion[1], insertion[1] + insertion[0][1]];
	})

	let freqs = new Map();
	const steps = 40;

	for (const pair in map) freqs[pair] = 0;

	for (let i = 0; i < chain.length - 1; i++) {
		pair = chain.slice(i, i + 2);
		freqs[pair] += 1;
	}

	for (let step = 0; step < steps; step++) {
		freqs = makeStep(freqs, map);
	}

	let count = new Map();
	count[chain[0]] = 1;

	for (const pair in freqs) {
		if (!count[pair[1]]) count[pair[1]] = 0;
		count[pair[1]] += freqs[pair];
	}

	let maxMin = [0, +Infinity];

	for (const el in count) {
		let num = count[el];
		maxMin[0] = Math.max(num, maxMin[0]);
		maxMin[1] = Math.min(num, maxMin[1]);
	}

	result = maxMin[0] - maxMin[1];

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 14:', solution);