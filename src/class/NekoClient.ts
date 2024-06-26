/* eslint-disable @typescript-eslint/no-explicit-any */
import endpoints from "../../config/json/endpoints.json";
import { getContent } from "../libraries/NekosLib";

/* The NekoClient class is designed to dynamically create methods for accessing various endpoints from
the nekos.life API. */
export class NekoClient {
  [key: string]: any;
  constructor() {
    const baseURL = 'https://nekos.life/api/v2';
    Object.keys(endpoints).forEach(async (endpoint: string) => {
      this[endpoint] = async function (queryParams = '') {
        const url = new URL(`${baseURL}${(endpoints as any)[endpoint]}`);
        queryParams !== '' ? (url.search = new URLSearchParams(queryParams).toString()) : '';
        return await getContent(url.toString());
      };
    });
  }
}
