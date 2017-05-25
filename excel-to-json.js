import fs from 'fs';
import csv from 'csv';
import assert from 'assert';

const OUTPUT_FILE = './output/import.json';

const [,,filename] = process.argv;

assert.ok(filename, 'Filename is missing');
console.log('FILE:', filename);

const input = fs.readFileSync(filename);

csv.parse(input, {}, (error, output) => {
  assert.ok(!error, error);

  const objects = output.map(([, category, label, translation, right, ...wrong]) => {
    return { category, label, translation, answers: { right, wrong } };
  });

  const lines = objects
    .map(JSON.stringify)
    .map(line => line.concat('\n'));

  try {
    fs.unlinkSync(OUTPUT_FILE);
  } catch (e) {
  }

  lines.forEach(line => {
    fs.appendFileSync(OUTPUT_FILE, line, { encoding: 'utf8' });
  });

});