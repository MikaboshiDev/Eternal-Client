import { get } from 'https';

export function getContent(url: string) {
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
        } catch (e) {
          if (e instanceof Error) {
            reject(`Error: ${e.message}`);
          }
        }
      });
    }).on('error', (err) => {
      reject(`Error: ${err.message}`);
    });
  });
}
