import fs from 'fs';
import path from 'path';

try {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trimEnd();
    const left: number[] = [];
    const right: number[] = [];
    const rightIncidences: Record<number, number> = {};

    input
        .split('\n')
        .map(row => row.split('   '))
        .forEach(([l, r]) => {
            left.push(+l);
            right.push(+r);
            rightIncidences[+r] = (rightIncidences[+r] ?? 0) + 1;
        });

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    const distances = left.map((value, index) => Math.abs(value - right[index]));
    const totalDistance = distances.reduce((totalDistance, distance) => totalDistance + distance);

    const leftSimilarityScores = left.map(value => value * (rightIncidences[value] ?? 0));
    const totalSimilarityScore = leftSimilarityScores.reduce(
        (totalSimilarityScore, similarityScore) => totalSimilarityScore + similarityScore
    );

    console.log(`-> totalDistance=${totalDistance}`);
    console.log(`-> totalSimilarityScore=${totalSimilarityScore}`);
} catch (err) {
    console.error('Error reading file:', err);
}
