const fs = require('fs');

const evaluate = (grid, i, j, visited) => {
	if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || visited[i][j]) return 0;

	if (i > 0) {
		if (+grid[i - 1][j] <= +grid[i][j]) return 0;
		visited[i - 1][j] = true;
	}
	if (j > 0) {
		if (+grid[i][j - 1] <= +grid[i][j]) return 0;
		visited[i][j - 1] = true;
	}
	if (i < grid.length - 1) {
		if (+grid[i + 1][j] <= +grid[i][j]) return 0;
		visited[i + 1][j] = true;
	}
	if (j < grid[0].length - 1) {
		if (+grid[i][j + 1] <= +grid[i][j]) return 0;
		visited[i][j + 1] = true;
	}

	// console.log('evaluating', i, j, grid[i][j], 'is low');

	return [i, j];
}

const dfs = (grid, i, j, visited) => {
	if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || visited[i][j] || +grid[i][j] === 9) return 0;

	visited[i][j] = true;
	let deep = 1;
	deep += dfs(grid, i - 1, j, visited);
	deep += dfs(grid, i, j - 1, visited);
	deep += dfs(grid, i + 1, j, visited);
	deep += dfs(grid, i, j + 1, visited);

	return deep;
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	
	let grid = strInput.split('\n');
	let points = new Array();

	let visited = new Array(grid.length);
	for (let i = 0; i < visited.length; i++) visited[i] = new Array(grid[0].length).fill(false);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			// console.log(visited);
			let point = evaluate(grid, i, j, visited);
			if (point !== 0) points.push(point);
		}
	}
	let deeps = [];

	points.forEach(point => {
		let visit = new Array(grid.length);
		for (let i = 0; i < visit.length; i++) visit[i] = new Array(grid[0].length).fill(false);
		deeps.push(dfs(grid, point[0], point[1], visit));
	})

	deeps = deeps.sort((a, b) => b - a);
	result = deeps[0] * deeps[1] * deeps[2];

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 9:', solution);