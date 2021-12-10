const fs = require('fs');

let getScore = (bracket) => {
	switch (bracket) {
		case ')': return 3;
		case ']': return 57;
		case '}': return 1197;
		case '>': return 25137;
		default: return 0;
	}
}

let matches = (b1, b2) => {
	if (b1 === '(' && b2 === ')') return true;
	if (b1 === '[' && b2 === ']') return true;
	if (b1 === '{' && b2 === '}') return true;
	if (b1 === '<' && b2 === '>') return true;
	return false;
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	
	let lines = strInput.split('\n');

	let stack = [];
	const opening = '([{<';

	lines.forEach(line => {
		stack = [];
		for (let i = 0; i < line.length; i++) {
			if (opening.includes(line[i])) {
				stack.push(line[i]);
			} else {
				let prev = stack.pop();;
				if (!matches(prev, line[i])) {
					result += getScore(line[i]);

					break;
				}
			}
		}
	})

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 10:', solution);