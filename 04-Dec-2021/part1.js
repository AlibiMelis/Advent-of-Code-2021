const fs = require('fs');

const createTable = (bigMap, rawTable, tableIndex) => {
	let rows = rawTable.split('\n')
	let table = new Array(rows.length);
	rows.forEach((row, i) => {
		let cols = row.split(' ').filter(val => val.length > 0);
		table[i] = new Array(cols.length);
		cols.forEach((val, j) => {
	  		table[i][j] = +val;
	  		if (!bigMap[+val]) bigMap[+val] = new Map();
	  		bigMap[+val][tableIndex] = [i, j];
		});
	});
	return table;
}

const isWinning = (table, ix, jx) => {
  	let i = 0;
	for (; i < table.length; i++) {
		if (table[i][jx] !== 'x') break;
	}
	if (i === table.length) return true;

	let j = 0;
	for (; j < table[ix].length; j++) {
		if (table[ix][j] !== 'x') break;
	}
	if (j === table[ix].length) return true;

	return false;
}

const cross = (table, i, j) => {
	table[i][j] = 'x';
	if (isWinning(table, i, j)) return true;
	return false;
}

const endGame = (table, winningNumber) => {
	let sum = 0;
	for (let i = 0; i < table.length; i++) {
		for (let j = 0; j < table[0].length; j++) {
			if (table[i][j] !== 'x') sum += table[i][j];
		}
	}
	let score = sum * winningNumber;
	return score;
}

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	
	const rows = strInput.split('\n\n');

	const bingo = rows[0].split(',').map(val => +val);

	let tables = new Array(rows.length - 1);
	let bigMap = new Map();

	for (let i = 1; i < rows.length; i++) {
		tables[i - 1] = createTable(bigMap, rows[i], i - 1);
	}

	// <-------- SOLUTION FOR PART ONE --------->
	// for (let i = 0; i < bingo.length; i++) {
	//   let number = bingo[i];
	//   let occuringTables = bigMap[number];
	//   let result = false;
	//   for (let tableIndex in occuringTables) {
	//     let position = occuringTables[tableIndex];
	//     let table = tables[tableIndex];
	//     result = cross(table, position[0], position[1]);
	//     if (result) {
	//       endGame(table, number);
	//       break;
	//     }
	//   }
	//   if (result) break;
	// }

	// <-------- SOLUTION FOR PART TWO --------->
	let winners = new Map();
	for (let i = 0; i < bingo.length; i++) {
		let number = bingo[i];
		let occuringTables = bigMap[number];
		for (let tableIndex in occuringTables) {
		  	if (winners[tableIndex]) continue;
		  	let position = occuringTables[tableIndex];
		  	let table = tables[tableIndex];
		  	if (cross(table, position[0], position[1])) {
		    	result = endGame(table, number);
		    	winners[tableIndex] = true;
		  	}
		}
	}

	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 04:', solution);