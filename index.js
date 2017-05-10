import assert from 'assert';
import request from 'request';
import cheerio from 'cheerio';

const uri = infinitiv => `https://www.scholingua.com/en/de/conjugation/${infinitiv}`;

const findPerfect = document => (
  document('#konjugationstabellen')
    .children('div') // k_tabelle
    .children('div').eq(0) // block
    .children('div').eq(2)
    .children('table')
    .children('tr').eq(5)
    .children('td').eq(1)
    .children('div')
    .children('div').eq(1)
    .text().split(',').shift()
);

const findSimplePast = document => (
  document('#konjugationstabellen')
    .children('div') // k_tabelle
    .children('div').eq(0) // block
    .children('div').eq(1)
    .children('table')
    .children('tr').eq(5)
    .children('td').eq(1)
    .children('div')
    .children('div').eq(1)
    .text().split(',').shift()
);

request(uri('vergessen'), (error, response, body) => {
  assert(!error, `Error during the request : ${error}`);

  const document = cheerio.load(body);

  console.log('Perfekt :', findPerfect(document));
  console.log('Simple past:', findSimplePast(document));
});