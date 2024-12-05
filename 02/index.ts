import fs from 'fs';
import path from 'path';

function isSafe(levels: number[]): boolean {
    if (levels.length < 2) return false;

    const firstLevel = levels[0];
    const secondLevel = levels[1];
    if (firstLevel === secondLevel) return false;

    const behavior = firstLevel < secondLevel ? 'increasing' : 'decreasing';
    return !levels.some((level, index, levels) => {
        if (index === 0) return false;

        const previousLevel = levels[index - 1];
        const difference = behavior === 'increasing' ? level - previousLevel : previousLevel - level;

        return difference <= 0 || difference > 3;
    });
}

try {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trimEnd();
    const reports = input.split('\n').map(report => report.split(' ').map(Number));

    const safeReports = reports
        .map(levels => {
            const dampeningReports = [levels];
            for (let index = 0; index < levels.length; index++) {
                const newLevels = [...levels];
                newLevels.splice(index, 1);
                dampeningReports.push(newLevels);
            }

            return dampeningReports;
        })
        .filter(dampeningReports => dampeningReports.some(isSafe));
    console.log(`-> safeReports=${safeReports.length}`);
} catch (err) {
    console.error('Error reading file:', err);
}
