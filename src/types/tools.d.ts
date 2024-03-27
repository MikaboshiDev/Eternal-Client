declare namespace ApiTools {
  export interface AppWeb {
    description: string;
    licence: string;
    iconURL: string;
    ownerId: string;
    supportServer: string;
    emailContact: string;
  }

  export interface AppWebGet {
    id: string;
  }
}

export = ApiTools;
