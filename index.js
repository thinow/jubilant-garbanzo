import assert from 'assert';
import request from 'request';

assert(process.env.API_KEY, 'process.env.API_KEY is mandatory');

const API_KEY = process.env.API_KEY;
const uri = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

const data = { q: 'machen', source: 'de', target: 'en' };

request({ method: 'POST', uri, data }, (error, response, body) => {
  assert(!error, `Error during the request : ${error}`);

  // console.log('Response:', response);
  console.log('Body:', body);
});