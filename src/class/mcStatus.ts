import apis from '../../config/apis.json';
import axios from 'axios';

export class mcStatus {
  type: string;
  ip: string;
  constructor(type: string, ip: string) {
    this.type = type;
    this.ip = ip;
  }

  async getStatus() {
    type McType = 'bedrock' | 'java';

    if (!['bedrock', 'java'].includes(this.type as McType)) {
      throw new Error('Invalid type of Minecraft server provided.');
    }
    const res = await axios.get(`${apis.endpoints.mc[1]}/${this.type}/${this.ip}`);
    if (res.status !== 200) return false;
    return res.data;
  }
}
