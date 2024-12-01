import * as fs from 'node:fs';

const inputPath = './input.txt';

try {
  const inputData = fs.readFileSync(inputPath, 'utf8');

  if (!inputData) {
    throw new Error('Input data is empty');
  }

  const arrayOfNumbers = inputData
    .trim()
    .split('\n')
    .map((line) => {
      const [left, right] = line.trim().split(/\s+/).map(Number);
      return [left, right];
    });

  const sortedLeftList = arrayOfNumbers
    .map((pair) => pair[0])
    .sort((a, b) => a - b);
  const sortedRightList = arrayOfNumbers
    .map((pair) => pair[1])
    .sort((a, b) => a - b);

  const totalDistance = sortedLeftList.reduce((sum, left, index) => {
    return sum + Math.abs(left - sortedRightList[index]);
  }, 0);

  console.log('TOTAL DISTANCE', totalDistance);

  // Part Two

  const leftList = arrayOfNumbers.map((pair) => pair[0]);
  const rightList = arrayOfNumbers.map((pair) => pair[1]);

  const similarityScore = leftList.reduce((sum, leftNum) => {
    const occurrencesInRight = rightList.filter(
      (num) => num === leftNum
    ).length;
    return sum + leftNum * occurrencesInRight;
  }, 0);

  console.log('SIMILARITY SCORE:', similarityScore);
} catch (error) {
  console.error(error);
}
