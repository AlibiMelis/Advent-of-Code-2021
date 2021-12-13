const fs = require('fs');

const addPoint = (map, x, y) => {
	if (!map[x]) map[x] = new Set();
	map[x].add(y);
}

const doFold = (map, fold) => {
	let counter = 0;
	if (fold.axis === 'y') {
		for (const x in map) {
			let toDelete = [];
			let toAdd = [];
			for (const y of map[x]) {
				if (y === fold.value) {
					counter++;
					toDelete.push(y);
				} else if (y > fold.value) {
					let mirror = fold.value - (y - fold.value);
					if (map[x].has(mirror)) {
						counter++;
					} else {
						toAdd.push(mirror);
					}
					toDelete.push(y);
				}
			}
			toDelete.forEach(y => map[x].delete(y));
			toAdd.forEach(y => map[x].add(y));
		}
	} else {
		let toDelete = [];
		for (const x in map) {
			if (x === fold.value) {
				counter += map[x].size();
				toDelete.push(x);
			} else if (x > fold.value) {
				let mirror = fold.value - (x - fold.value);
				for (const y of map[x]) {
					if (map[mirror] && map[mirror].has(y)) {
						counter++;
					} else {
						if (!map[mirror]) map[mirror] = new Set();
						map[mirror].add(y);
					}
				}
				toDelete.push(x);
			}
		}
		toDelete.forEach(x => delete map[x]);
 	}
	return counter;
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	const input = strInput.split('\n\n');

	let map = new Map();
	let pointsCount = 0;

	let maxX = 0;
	let maxY = 0;

	input[0].split('\n').forEach(point => {
		let coorditanes = point.split(',');
		maxX = Math.max(+coorditanes[0], maxX);
		maxY = Math.max(+coorditanes[1], maxY);
		addPoint(map, +coorditanes[0], +coorditanes[1]);
		pointsCount++;
	});
	let folds = input[1].split('\n').map(instr => {
		let fold = instr.split(' ')[2].split('=');
		return {axis: fold[0], value: +fold[1]};
	});

	for (let i = 0; i < folds.length; i++) {
		pointsCount -= doFold(map, folds[i]);
	}
	visualise(map);

	result = pointsCount;
	return result;
}

const visualise = map => {
	for (let j = 0; j < 6; j++) {
		for (let i = 0; i < 40; i++) {
			if (map[i]) {
				if (map[i].has(j)) {
					process.stdout.write('#');
				} else {
					process.stdout.write(' ');
				}
			} else {
				process.stdout.write(' ');
			}
		}
		process.stdout.write('\n');
	}
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 13:', solution);