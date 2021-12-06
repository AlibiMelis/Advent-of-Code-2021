const fs = require('fs');

// One way of solving
let passDay = (population) => {
	let newFish = 0;
	population = population.map(fish => {
		if (fish === 0) {
			newFish += 1;
			return 6;
		}
		return fish - 1;
	});
	for (let i = 0; i < newFish; i++) population.push(8);
	return population;
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	const stringData = data.toString();
 	let population = stringData.split(',').map(fish => +fish);
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
 	let total = counts.reduce((acc, fish) => acc + fish);
 	console.log(total);
})