import * as fs from 'node:fs';

const inputPath = './input.txt';

try {
  const inputData = fs.readFileSync(inputPath, 'utf8');

  if (!inputData) {
    throw new Error('Input data is empty');
  }

  function countXMASPatterns(grid: string[][]): number {
    const numRows = grid.length;
    const numCols = grid[0].length;
    let count = 0;

    function isValid(x: number, y: number): boolean {
      return x >= 0 && x < numRows && y >= 0 && y < numCols;
    }

    function checkXMASPattern(centerX: number, centerY: number): boolean {
      if (
        !isValid(centerX - 1, centerY - 1) ||
        !isValid(centerX - 1, centerY + 1) ||
        !isValid(centerX + 1, centerY - 1) ||
        !isValid(centerX + 1, centerY + 1)
      ) {
        return false;
      }

      const center = grid[centerX][centerY];
      const topLeft = grid[centerX - 1][centerY - 1];
      const topRight = grid[centerX - 1][centerY + 1];
      const bottomLeft = grid[centerX + 1][centerY - 1];
      const bottomRight = grid[centerX + 1][centerY + 1];

      if (center !== 'A') return false;

      return (
        (topLeft === 'M' &&
          bottomRight === 'S' &&
          topRight === 'M' &&
          bottomLeft === 'S') ||
        (topLeft === 'S' &&
          bottomRight === 'M' &&
          topRight === 'M' &&
          bottomLeft === 'S') ||
        (topLeft === 'M' &&
          bottomRight === 'S' &&
          topRight === 'S' &&
          bottomLeft === 'M') ||
        (topLeft === 'S' &&
          bottomRight === 'M' &&
          topRight === 'S' &&
          bottomLeft === 'M')
      );
    }

    for (let i = 1; i < numRows - 1; i++) {
      for (let j = 1; j < numCols - 1; j++) {
        if (checkXMASPattern(i, j)) {
          count++;
        }
      }
    }

    return count;
  }

  const grid = inputData.split('\n').map((row) => row.split(''));

  console.log('PART_TWO', countXMASPatterns(grid));
} catch (error) {
  console.error(error);
}
