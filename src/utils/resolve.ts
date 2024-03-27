import axios from "axios"

export async function resolve(params: string): Promise<string> {
  const response = await axios.get(`https://akaneko.cuteasfubuki.xyz/api/${params}`);
  if (response.status !== 200) throw new Error("Failed to fetch image");
  return response.data.url;
}
