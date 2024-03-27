import fetch from 'node-fetch';

export async function resolve(params: string): Promise<string> {
  return fetch(`https://akaneko.cuteasfubuki.xyz/api/${params}`)
    .then((res) => res.json())
    .then((json: any) => {
      return json.url;
    });
}
