import assert from 'assert';
import request from 'request';
import xpath from 'xpath';
import { DOMParser as dom } from 'xmldom';

const uri = `https://www.scholingua.com/en/de/conjugation/vergessen`;

request(uri, (error, response, body) => {
  assert(!error, `Error during the request : ${error}`);

  var doc = new dom().parseFromString(body);
  const found = xpath.select('//title', doc);
  found.map(item => console.log('XPath:', item.firstChild.data));
});