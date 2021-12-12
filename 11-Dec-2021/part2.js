const fs = require('fs');

const getAdj = (grid, position) => {
	let i = position[0];
	let j = position[1];
	let adjacent = [
		[i - 1, j - 1],
		[i - 1, j],
		[i - 1, j + 1],
		[i, j - 1],
		[i, j + 1],
		[i + 1, j - 1],
		[i + 1, j],
		[i + 1, j + 1],
	];

	return adjacent.filter(pos => {
		let r = pos[0];
		let c = pos[1];
		return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
	})
}

const takeStep = grid => {
	let flashes = [];

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j] += 1;
			if (grid[i][j] === 10) flashes.push([i, j]);
		}
	}

	while (flashes.length > 0) {
		let flash = flashes.shift();
		let adjacent = getAdj(grid, flash);
		for (const pos of adjacent) {
			let i = pos[0];
			let j = pos[1];
			grid[i][j] += 1;
			if (grid[i][j] === 10) flashes.push([i, j]);
		}
	}

	let flashCount = 0;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] >= 10) {
				grid[i][j] = 0;
				flashCount++;
			}
		}
	}

	return flashCount;
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	let rows = strInput.split('\n');
	let grid = new Array(rows.length);
	for (let i = 0; i < grid.length; i++) {
		grid[i] = new Array(rows[0].length);
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j] = +rows[i][j];
		}
	}

	let step = 0;
	const size = grid.length * grid[0].length;
	let stepFlashes = 0;

	while (stepFlashes !== size) {
		stepFlashes = takeStep(grid);
		step += 1;
	}
	result = step;

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 11:', solution);