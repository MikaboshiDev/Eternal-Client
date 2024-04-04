import { get } from 'https';

/**
 * The function `getContent` retrieves content from a specified URL and returns a promise that resolves
 * with the parsed JSON data or rejects with an error message.
 * @param {string} url - The `url` parameter in the `getContent` function is a string representing the
 * URL from which you want to fetch content. This function uses a Promise to asynchronously fetch
 * content from the provided URL and parse it as JSON data. If the request is successful (status code
 * 200), the parsed data is
 * @returns The `getContent` function is returning a Promise that resolves with the parsed JSON data
 * fetched from the provided URL. If the request is successful (status code 200), the function resolves
 * with the parsed data. If there is an error during the request or parsing the data, the function
 * rejects with an appropriate error message.
 */
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
