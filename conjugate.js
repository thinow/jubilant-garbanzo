import request from 'request';
import cheerio from 'cheerio';

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

export const conjugate = infinitiv => {
  return new Promise((resolve, reject) => {
    const uri = `https://www.scholingua.com/en/de/conjugation/${encodeURIComponent(infinitiv)}`;

    request(uri, (error, response, body) => {
      if (error) reject(error);

      const document = cheerio.load(body);

      resolve({
        perfect: findPerfect(document),
        simplePast: findSimplePast(document)
      })

    });
  });
};
