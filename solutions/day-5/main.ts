import * as fs from 'node:fs';

const inputPath = './input.txt';

try {
  const inputData = fs.readFileSync(inputPath, 'utf8');

  if (!inputData) {
    throw new Error('Input data is empty');
  }

  const [rulesSection, updatesSection] = inputData.split('\n\n');

  const rules = new Map<number, Set<number>>();
  rulesSection.split('\n').forEach((rule) => {
    const [before, after] = rule.split('|').map(Number);
    if (!rules.has(before)) {
      rules.set(before, new Set());
    }
    rules.get(before)!.add(after);
  });

  const updates = updatesSection
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.split(',').map(Number));

  function isValidOrder(update: number[]): boolean {
    for (let i = 0; i < update.length; i++) {
      const currentPage = update[i];

      for (let j = i + 1; j < update.length; j++) {
        const laterPage = update[j];

        if (rules.has(laterPage) && rules.get(laterPage)!.has(currentPage)) {
          return false;
        }
      }
    }
    return true;
  }

  function reorderUpdate(update: number[]): number[] {
    const ordered = [...update];
    ordered.sort((a, b) => {
      if (rules.has(a) && rules.get(a)!.has(b)) {
        return -1;
      }
      if (rules.has(b) && rules.get(b)!.has(a)) {
        return 1;
      }
      return 0;
    });
    return ordered;
  }

  const invalidUpdates = updates.filter((update) => !isValidOrder(update));
  const reorderedUpdates = invalidUpdates.map(reorderUpdate);

  const middleNumbers = reorderedUpdates.map((update) => {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
  });

  const sum = middleNumbers.reduce((acc, num) => acc + num, 0);

  console.log('Solution:', sum);
} catch (error) {
  console.error(error);
}
