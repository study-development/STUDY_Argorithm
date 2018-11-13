'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}


function combineWithoutRepetitions(comboOptions, comboLength) {
    if (comboLength === 1) {
      return comboOptions.map(comboOption => [comboOption]);
    }
  
    // Init combinations array.
    const combos = [];
  
    // Eliminate characters one by one and concatenate them to
    // combinations of smaller lengths.
    comboOptions.forEach((currentOption, optionIndex) => {
      const smallerCombos = combineWithoutRepetitions(
        comboOptions.slice(optionIndex + 1),
        comboLength - 1,
      );
  
      smallerCombos.forEach((smallerCombo) => {
        combos.push([currentOption].concat(smallerCombo));
      });
    });
  
    return combos;
  }
  
//   var test_arr = [ 20,7,23, 19, 10, 15, 25, 8, 13 ];
  // console.log(combineWithoutRepetitions(test_arr, 7))

  const test_arr = parseInt(readLine(), 10);
  
  var ninePickSeven = combineWithoutRepetitions(test_arr, 7)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
  
  const result =  ninePickSeven.filter(arr => arr.reduce((a, b) => a + b, 0) == 100);
    
  console.log(result);
  // console.log(result_arr);
  
  
  
  
