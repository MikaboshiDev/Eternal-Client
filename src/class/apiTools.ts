import axios from 'axios';

/* The `ApiTools` class in TypeScript provides methods for interacting with a web API to post, get, and
retrieve applications with specific parameters and error handling. */
export class ApiTools {
  client: any;
  url: string;

  constructor(url: string, client: any) {
    this.url = url;
    this.client = client;
  }

  public async postAppWeb({
    description,
    iconURL,
    ownerId,
    licence,
    email,
    supportServer,
  }: {
    description: string;
    iconURL: string;
    ownerId: string;
    licence: string;
    email: string;
    supportServer: string;
  }) {
    try {
      const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/);
      const params = [description, iconURL, ownerId, email];

      if (params.some((param) => !param)) throw new Error('Missing parameters for postAppWeb method');
      if (!regex.test(iconURL)) throw new Error('Invalid URL provided for iconURL parameter');

      const response = await axios({
        url: `${this.url}/aplications/register/${this.client.user.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          name: this.client.user.username,
          id: this.client.user.id,
          description: description ? description : 'No description provided',
          licence: licence,
          avatarURL: iconURL,
          ownerId: ownerId,
          guilds: this.client.guilds,
          supportServer: supportServer,
          emailContact: email,
        },
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (e) {
      throw new Error(e as any);
    }
  }

  public async getAppWeb({ id }: { id: string }) {
    try {
      if (!id) throw new Error('Missing parameters for getAppWeb method');

      const response = await axios({
        url: `${this.url}/aplications/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (e) {
      throw new Error(e as any);
    }
  }

  public async getAppsWeb() {
    try {
      const response = await axios({
        url: `${this.url}/aplications`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (e) {
      throw new Error(e as any);
    }
  }
}
