const fs = require('fs');

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	let patterns = strInput.split('\n');

	patterns.forEach(pattern => {
		result += pattern.split('|')[1].split(' ').reduce((count, output) => {
			if (output.length == 2 || output.length == 3 || output.length == 4 || output.length == 7) {
				count += 1;
			}
			return count;
		}, 0);
	})

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 8:', solution);