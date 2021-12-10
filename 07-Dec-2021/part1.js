const fs = require('fs');

const solve = strInput => {
	// Write the solution here.
	let maxPos = 0;

	const positions = strInput.split(',').map(pos => {
		let number = +pos;
		maxPos = Math.max(maxPos, number);
		return number;
	});

	let minFuel = +Infinity;
	for (let i = 0; i <= maxPos; i++) {
		let localFuel = positions.reduce((acc, pos) => acc + Math.abs(pos - i), 0);
		minFuel = Math.min(minFuel, localFuel);
	}

	return minFuel;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 7:', solution);