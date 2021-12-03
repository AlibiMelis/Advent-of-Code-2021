const fs = require('fs')

let toDecimal = (binary) => {
  let dec = 0;
  for (let i = binary.length - 1; i >= 0; i--) {
    let power = binary.length - 1 - i;
    dec += (+binary[i]) === 1 ? 2 ** power : 0;
  }
  return dec;
}

let calcFreqs = (rates) => {
  let freq = new Array(rates[0].length).fill(0);

  for (let i = 0; i < rates.length; i++) {
    let rate = rates[i];
    for (let j = 0; j < freq.length; j++) {
      let bit = rate[j];
      freq[j] += bit === '1' ? 1 : -1;
    }
  }

  return freq;
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const stringData = data.toString();

  const rates = stringData.split('\n');

  let freq = calcFreqs(rates);

  console.log(freq);

  let gamma = new Array(freq.length);
  let epsilon = new Array(freq.length);

  for (let i = 0; i < freq.length; i++) {
    gamma[i] = freq[i] >= 0 ? 1 : 0;
    epsilon[i] = freq[i] >= 0 ? 0 : 1;
  }

  let oxygen = rates.slice();
  let co2 = rates.slice();

  let temp = [];

  let i = 0;
  while (oxygen.length > 1 && i < oxygen[0].length) {

    let freqs = calcFreqs(oxygen);
    for (let i = 0; i < freqs.length; i++) {
      gamma[i] = freqs[i] >= 0 ? 1 : 0;
    } 
    temp = oxygen.filter((rate) => +rate[i] === gamma[i]);
    if (temp.length < 1) break;
    oxygen = temp;
    i++;
  }



  i = 0;
  while (co2.length > 1 && i < co2[0].length) {
    let freqs = calcFreqs(co2);
    for (let i = 0; i < freqs.length; i++) {
      epsilon[i] = freqs[i] >= 0 ? 0 : 1;
    } 
    temp = co2.filter((rate) => +rate[i] === epsilon[i]);
    if (temp.length < 1) break;
    co2 = temp;
    i++;
  }

  // console.log(gamma);
  // console.log(epsilon);

  // console.log(oxygen);
  // console.log(co2);

  let decGamma = toDecimal(gamma);
  let decEpsilon = toDecimal(epsilon);
  let decOxy = toDecimal(oxygen[0]);
  let decCo2 = toDecimal(co2[0]);

  console.log(decOxy, decCo2);

  console.log(decOxy * decCo2);
})

