const fs = require('fs');

const getScore = (bracket) => {
	switch (bracket) {
		case ')': return 3;
		case ']': return 57;
		case '}': return 1197;
		case '>': return 25137;
		default: return 0;
	}
}

const matches = (b1, b2) => {
	if (b1 === '(' && b2 === ')') return true;
	if (b1 === '[' && b2 === ']') return true;
	if (b1 === '{' && b2 === '}') return true;
	if (b1 === '<' && b2 === '>') return true;
	return false;
}

const getCompletingScore = bracket => {
	switch (bracket) {
		case '(': return 1;
		case '[': return 2;
		case '{': return 3;
		case '<': return 4;
		default: return 0;
	}
}

const solve = strInput => {
	let result = [];
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
					break;
				}
			}
		}
		let localScore = 0;
		while (stack.length > 0) {
			localScore = localScore * 5 + getCompletingScore(stack.pop());
		}
		result.push(localScore);
	})

	return result.sort()[result.length / 2];
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 10:', solution);