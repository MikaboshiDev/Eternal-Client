import endpoints from '../config/endpoints.json';
import { URL, URLSearchParams } from 'url';
import { get } from 'https';

function getContent(url: any) {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        res.resume();
        reject(`Request failed. Status code: ${statusCode}`);
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e: any) {
          reject(`Error: ${e.message}`);
        }
      });
    }).on('error', (err) => {
      reject(`Error: ${err.message}`);
    });
  });
}

export class NekoClient {
    [key: string]: any;
  constructor() {
    let self = this;
    let baseURL = 'https://nekos.life/api/v2';
    Object.keys(endpoints).forEach(async (endpoint: any) => {
      self[endpoint] = async function (queryParams = '') {
        let url = new URL(`${baseURL}${(endpoints as any)[endpoint]}`);
        queryParams !== '' ? (url.search = new URLSearchParams(queryParams).toString()) : '';
        return await getContent(url.toString());
      };
    });
  }
}