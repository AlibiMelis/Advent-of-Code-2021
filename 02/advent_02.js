const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const stringData = data.toString();

  const moves = stringData.split('\n');

  let x = 0;
  let y = 0;
  let aim = 0;

  moves.forEach(move => {
    let dir = move.split(' ');

    if (dir[0] === 'forward') {
      x += +dir[1];
      y += +dir[1] * aim;
    } else if (dir[0] === 'down') {
      aim += +dir[1];
    } else if (dir[0] === 'up') {
      aim -= +dir[1];
    }

  });
  

  console.log(x * y);
})