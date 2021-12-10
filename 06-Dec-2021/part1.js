const fs = require('fs');

const solve = strInput => {
	let result = 0;
	// Write the solution here.
	
	let population = strInput.split(',').map(fish => +fish);
 	let period = 256;

 	let counts = new Array(9).fill(0);

 	for (let i = 0; i < population.length; i++) {
 		counts[population[i]] += 1;
 	}

 	let newFish = 0;
 	for (let day = 0; day < period; day++) {
 		newFish = counts[0];
 		for (let i = 0; i < 8; i++) {
 			counts[i] = counts[i + 1];
 		}
 		counts[6] += newFish;
 		counts[8] = newFish;
 	}
 	result = counts.reduce((acc, fish) => acc + fish);
 	
	return result;
}

const data = fs.readFileSync('input.txt').toString();
const solution = solve(data);
console.log('Solution of Day 06:', solution);