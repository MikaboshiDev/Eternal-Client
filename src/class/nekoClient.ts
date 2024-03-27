import { getContent } from '../functions/nekos.life';
import endpoints from '../config/endpoints.json';

/* The NekoClient class is designed to dynamically create methods for accessing various endpoints from
the nekos.life API. */
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
