const fs = require('fs');

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	let patterns = strInput.split('\n');

	patterns.forEach(pattern => {
		let line = pattern.split('|');
		let outputs = line[1].split(' ');
		result += outputs.reduce((count, output) => {
			if (output.length == 2 || output.length == 3 || output.length == 4 || output.length == 7) {
				console.log(output);
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