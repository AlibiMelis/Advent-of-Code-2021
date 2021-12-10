const fs = require('fs');

const decode = (dict, code) => {
	if (code.length === 2) return 1;
	if (code.length === 3) return 7;
	if (code.length === 4) return 4;
	if (code.length === 7) return 8;

	if (code.length === 5) {
		if (dict[3] && dict[3] === code.split('').sort().join('')) return 3;
		if (dict[2] && dict[2] === code.split('').sort().join('')) return 2;
		if (dict[5] && dict[5] === code.split('').sort().join('')) return 5;

		let one = dict[1];

		let isThree = true;
		for (let i = 0; i < one.length; i++) {
			if (!code.includes(one[i])) {
				isThree = false;
				break;
			}
		}
		if (isThree) {
			dict[3] = code.split('').sort().join('');
			return 3;
		}

		let inFive = '';
		for (let i = 0; i < dict[4].length; i++) {
			if (!dict[1].includes(dict[4][i])) inFive += dict[4][i];
		}

		let isFive = true;
		for (let i = 0; i < inFive.length; i++) {
			if (!code.includes(inFive[i])) {
				isFive = false;
				break;
			}
		}
		if (isFive) {
			dict[5] = code.split('').sort().join('');
			return 5;
		}

		return 2;
	}

	if (code.length === 6) {
		if (dict[6] && dict[6] === code.split('').sort().join('')) return 6;
		if (dict[9] && dict[9] === code.split('').sort().join('')) return 9;
		if (dict[0] && dict[0] === code.split('').sort().join('')) return 0;

		let notInZero = '';
		for (let i = 0; i < dict[4].length; i++) {
			if (!dict[1].includes(dict[4][i])) notInZero += dict[4][i];
		}

		let isZero = false;
		for (let i = 0; i < notInZero.length; i++) {
			if (!code.includes(notInZero[i])) {
				isZero = true;
			}
		}
		if (isZero) {
			dict[0] = code.split('').sort().join('');
			return 0;
		}

		let one = dict[1];

		let isNine = true;
		for (let i = 0; i < one.length; i++) {
			if (!code.includes(one[i])) {
				dict[6] = code.split('').sort().join('');
				return 6;
			}
		}
		dict[9] = code.split('').sort().join('');
		return 9;
	}
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	let patterns = strInput.split('\n');

	patterns.forEach(pattern => {
		let decoded = 0;

		let dict = new Array(10);

		let line = pattern.split(' | ');
		let digits = line[0].split(' ')
		let outputs = line[1].split(' ');
		console.log(outputs);

		digits.forEach(digit => {
			if (digit.length === 2) {
				dict[1] = digit.split('').sort().join('');
			} else if (digit.length === 3) {
				dict[7] = digit.split('').sort().join('');
			} else if (digit.length === 4) {
				dict[4] = digit.split('').sort().join('');
			} else if (digit.length === 7) {
				dict[8] = digit.split('').sort().join('');
			}
		})

		for (let i = 0; i < outputs.length; i++) {
			decoded += 10 ** (3 - i) * decode(dict, outputs[i]);
			console.log(decoded);
		}
		result += decoded;
	})

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 8:', solution);