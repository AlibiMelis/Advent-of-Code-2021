const fs = require('fs');

const connect = (map, e1, e2) => {
	if (!map[e1]) map[e1] = new Array();
	map[e1].push(e2);
	if (!map[e2]) map[e2] = new Array();
	map[e2].push(e1);
}

const findPath = (map, vertex, path) => {
	
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	let rawEdges = strInput.split('\n');
	let map = new Map();
	for (const rawEdge of rawEdges) {
		let edge = rawEdge.split('-');
		connect(map, edge[0], edge[1]);
	}

	let visited = new Set();
	result = findPath(map, 'start', visited,'', 0);
	
	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 12:', solution);