import * as fs from 'node:fs';

const inputPath = './input.txt';

try {
  const inputData = fs.readFileSync(inputPath, 'utf8');

  if (!inputData) {
    throw new Error('Input data is empty');
  }

  const instructions = inputData.match(/mul\((\d+),(\d+)\)/g);

  const results = instructions.map((instruction) => {
    const [_, x, y] = instruction.match(/mul\((\d+),(\d+)\)/)!.map(Number);
    return x * y;
  });

  const sum = results.reduce((a, b) => a + b, 0);
  console.log('MUI_SUM', sum);

  const doOrDontInstructions = inputData.match(
    /(?:do\(\)|don't\(\)|mul\(\d+,\d+\))/g
  );

  let isEnabled = true;
  const doOrDontResults = doOrDontInstructions.reduce(
    (acc: number[], instruction) => {
      if (instruction === 'do()') {
        isEnabled = true;
        return acc;
      }
      if (instruction === "don't()") {
        isEnabled = false;
        return acc;
      }

      const [_, x, y] = instruction.match(/mul\((\d+),(\d+)\)/)!.map(Number);
      if (isEnabled) {
        acc.push(x * y);
      }
      return acc;
    },
    []
  );

  const sum2 = doOrDontResults.reduce((a, b) => a + b, 0);

  console.log('DO_OR_DONT_SUM', sum2);
} catch (error) {
  console.error(error);
}
