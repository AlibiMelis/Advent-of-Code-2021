const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const stringData = data.toString();

  const depths = stringData.split('\n');

  let result = 0;

  for (let i = 3; i < depths.length; i++) {
    let sum1 = +depths[i - 1] + +depths[i - 2] + +depths[i - 3];
    let sum2 = +depths[i] + +depths[i - 1] + +depths[i - 2];
    if (sum2 - sum1 > 0) {
      // console.log(i, result, ': ', depths[i], 'is more than', depths[i - 1]);
      result += 1;
    }
  }

  console.log(result);
})