const fs = require('fs');

let print = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(' '))
  }
}

let draw = (grid, p1, p2) => {
  let x1 = +p1[0];
  let y1 = +p1[1];
  let x2 = +p2[0];
  let y2 = +p2[1];

  // if (x1 !== x2 && y1 !== y2) return 0;

  let counter = 0;

  if (x1 === x2) {
    let startI = Math.min(y1, y2);
    let endI = Math.max(y1, y2);
    for (let i = startI; i <= endI; i++) {
      grid[i][x1] += 1;
      if (grid[i][x1] == 2) counter += 1;
    }
  } else if (y1 === y2) {
    let startJ = Math.min(x1, x2);
    let endJ = Math.max(x1, x2);
    for (let j = startJ; j <= endJ; j++) {
      grid[y1][j] += 1;
      if (grid[y1][j] == 2) counter += 1;
    }
  } else if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    if (x1 <= x2 && y1 <= y2) {
      for (let i = y1, j = x1; i <= y2, j <= x2; i++, j++) {
        grid[i][j] += 1;
        if (grid[i][j] == 2) counter += 1;
      }
    } else if (x1 > x2 && y1 > y2) {
      for (let i = y2, j = x2; i <= y1, j <= x1; i++, j++) {
        grid[i][j] += 1;
        if (grid[i][j] == 2) counter += 1;
      }
    } else {
      let startI = Math.min(y1, y2);
      let endI = Math.max(y1, y2);
      let startJ = Math.max(x1, x2);
      let endJ = Math.min(x1, x2);

      for (let i = startI, j = startJ; i <= endI, j >= endJ; i++, j--) {
        grid[i][j] += 1;
        if (grid[i][j] == 2) counter += 1;
      }
    }
  }
  return counter;
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const stringData = data.toString();

  const lines = stringData.split('\n');
  
  let grid = new Array(1000);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(1000).fill(0);
  }


  let doublePointCount = 0;

  for (let i = 0; i < lines.length; i++) {
    let points = lines[i].split(' ');

    let point1 = points[0].split(',');
    let point2 = points[2].split(',');

    doublePointCount += draw(grid, point1, point2);
  }

  console.log(doublePointCount);
})