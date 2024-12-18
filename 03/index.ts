import fs from 'fs';
import path from 'path';

function mul(number1: number, number2: number) {
    return number1 * number2;
}

try {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trimEnd();
    const functions = [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)].map(([value]) => value);

    let enabled = true;
    const results = functions.reduce((multiplies, fn) => {
        switch (fn) {
            case 'do()':
                enabled = true;
                break;

            case "don't()":
                enabled = false;
                break;

            default:
                if (enabled) multiplies.push(eval(fn));
                break;
        }

        return multiplies;
    }, []);

    const sum = results.reduce((total, result) => result + total);

    console.log(`-> sum=${sum}`);
} catch (err) {
    console.error('Error reading file:', err);
}
