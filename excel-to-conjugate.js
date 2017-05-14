import fs from 'fs';
import csv from 'csv';
import assert from 'assert';
import { conjugate } from './conjugate';

const input = fs.readFileSync('./resources/infinitiv.csv');

csv.parse(input, {}, (error, output) => {
  assert.ok(!error, error);

  const verbs = output.map(([verb]) => verb);

  verbs.forEach(verb => {
    conjugate(verb)
      .then(({ perfect, simplePast }) => console.log(([verb, perfect, simplePast].join(','))))
      .catch(console.error);
  });

});
