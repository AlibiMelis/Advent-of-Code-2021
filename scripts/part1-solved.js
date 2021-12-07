const fs = require('fs');
const cpy = require('cpy');
const { getDatePath } = require('../scripts/get-date.js');

(async () => {
	const date = getDatePath();
    // console.log(path);
    if (fs.existsSync(`${date}/part2.js`)) {
		console.log('Part 2 is already created.');
		return; 
	}
    await cpy(`${date}/part1.js`, `${date}`, {
		rename: basename => 'part2.js'
	}).then(() => {
		console.log("Part 2 file copied");
	}).catch(err => {
		console.log(err);
		cleanUp(date);
	});
})();