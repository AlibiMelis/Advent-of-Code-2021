const fs = require('fs');
const makeDir = require('make-dir');
const cpy = require('cpy');
const del = require('del');
const { getDatePath } = require('../scripts/get-date.js');

const cleanUp = (path) => {
	(async () => {
	    const deletedDirectoryPaths = await del([path]);
	    console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'));
	})();
}

(async () => {
	const date = getDatePath();
    const path = await makeDir(date);
    // console.log(path);
    await cpy('scripts/template.js', `${date}`, {
		rename: basename => 'part1.js'
	}).then(() => {
		console.log("Template copied");
	}).catch(err => {
		console.log(err);
		cleanUp(date);
	});

	const day = date.split('-')[0];
	const solutionLog = `\nconsole.log('Solution of Day ${day}:', solution);`
	fs.appendFile(`${date}/part1.js`, solutionLog, (err) => {
		if (err) {
			console.log(err);
			cleanUp(date);
		}
	});

	fs.writeFile(`${date}/input.txt`, '', (err) => {
		if (err) {
			console.log(err);
			cleanUp(date);
		}
	});
})();