const fs = require('fs');

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	
	const depths = strInput.split('\n');

	for (let i = 3; i < depths.length; i++) {
		let sum1 = +depths[i - 1] + +depths[i - 2] + +depths[i - 3];
		let sum2 = +depths[i] + +depths[i - 1] + +depths[i - 2];
		if (sum2 - sum1 > 0) {
		  result += 1;
		}
	}
	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 01:', solution);