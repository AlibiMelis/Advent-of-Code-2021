const fs = require('fs');

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	const moves = strInput.split('\n');

	let x = 0;
	let y = 0;
	let aim = 0;

	moves.forEach(move => {
		let dir = move.split(' ');

		if (dir[0] === 'forward') {
		 	x += +dir[1];
		 	y += +dir[1] * aim;
		} else if (dir[0] === 'down') {
		 	aim += +dir[1];
		} else if (dir[0] === 'up') {
		 	aim -= +dir[1];
		}

	});
	result = x * y;

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 02:', solution);