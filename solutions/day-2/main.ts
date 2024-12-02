import * as fs from 'node:fs';

const inputPath = './input.txt';

try {
  const inputData = fs.readFileSync(inputPath, 'utf8');

  if (!inputData) {
    throw new Error('Input data is empty');
  }

  const dataArray = inputData
    .trim()
    .split('\n')
    .map((line) => line.split(' ').map(Number));

  function isReportSafe(report: number[]): boolean {
    const isIncreasing = report[1] > report[0];

    for (let i = 1; i < report.length; i++) {
      const diff = report[i] - report[i - 1];
      const isDiffTooSmall = Math.abs(diff) < 1;
      const isDiffTooLarge = Math.abs(diff) > 3;
      const isWrongDirection =
        (isIncreasing && diff <= 0) || (!isIncreasing && diff >= 0);

      if (isDiffTooSmall || isDiffTooLarge) {
        return false;
      }

      if (isWrongDirection) {
        return false;
      }
    }

    return true;
  }

  const safeReports = dataArray.filter(isReportSafe);
  console.log(`NUMBER_OF_SAFE_REPORTS: ${safeReports.length}`);

  function isReportSafeWithDampener(report: number[]): boolean {
    if (isReportSafe(report)) {
      return true;
    }

    return report.some((_, i) => {
      const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
      return isReportSafe(modifiedReport);
    });
  }

  const safeReportsWithDampener = dataArray.filter(isReportSafeWithDampener);
  console.log(
    `NUMBER_OF_SAFE_REPORTS_WITH_DAMPENER: ${safeReportsWithDampener.length}`
  );
} catch (error) {
  console.error(error);
}
