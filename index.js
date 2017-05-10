import assert from 'assert';
import request from 'request';
import cheerio from 'cheerio';

const uri = `https://www.scholingua.com/en/de/conjugation/vergessen`;

request(uri, (error, response, body) => {
  assert(!error, `Error during the request : ${error}`);

  const $ = cheerio.load(body);

  //*[@id="konjugationstabellen"]/div/div[1]/div[2]/table/tbody/tr[6]/td[2]/div/div[2]

  const found = $('#konjugationstabellen')
    .children('div') // k_tabelle
    .children('div').eq(0) // block
    .children('div').eq(1)
    .children('table')
    .children('tr').eq(5)
    .children('td').eq(1)
    .children('div')
    .children('div').eq(1)
    .text();
  console.log(found);
});