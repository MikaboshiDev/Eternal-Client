declare class NekoClient {
  /* ----- Section #4 ----- */
  tickle(): Promise<NekoClient.NekoRequestResults>;
  slap(): Promise<NekoClient.NekoRequestResults>;
  smug(): Promise<NekoClient.NekoRequestResults>;
  baka(): Promise<NekoClient.NekoRequestResults>;
  poke(): Promise<NekoClient.NekoRequestResults>;

  /* ----- Section #6 ----- */
  nekoGif(): Promise<NekoClient.NekoRequestResults>;
  lizard(): Promise<NekoClient.NekoRequestResults>;
  neko(): Promise<NekoClient.NekoRequestResults>;
  meow(): Promise<NekoClient.NekoRequestResults>;
  kiss(): Promise<NekoClient.NekoRequestResults>;
  pat(): Promise<NekoClient.NekoRequestResults>;
  hug(): Promise<NekoClient.NekoRequestResults>;

  /* ----- Section #7 ----- */
  foxGirl(): Promise<NekoClient.NekoRequestResults>;
  cuddle(): Promise<NekoClient.NekoRequestResults>;
  woof(): Promise<NekoClient.NekoRequestResults>;
  feed(): Promise<NekoClient.NekoRequestResults>;
  why(): Promise<NekoClient.NekoWhyResult>;

  /* ----- Section #2 -----*/
  eightBall(opts: NekoClient.NekoQueryParams): Promise<NekoClient.NekoChatResults>;
  OwOify(opts: NekoClient.NekoQueryParams): Promise<NekoClient.NekoOwOResult>;
  kemonomimi(): Promise<NekoClient.NekoRequestResults>;
  holo(): Promise<NekoClient.NekoRequestResults>;
  catText(): Promise<NekoClient.NekoCatResult>;
  fact(): Promise<NekoClient.NekoFactResult>;

  /* ----- Section #1 -----*/
  spoiler(opts: NekoClient.NekoQueryParams): Promise<NekoClient.NekoOwOResult>;
  wallpaper(): Promise<NekoClient.NekoRequestResults>;
  avatar(): Promise<NekoClient.NekoRequestResults>;
  goose(): Promise<NekoClient.NekoRequestResults>;
  waifu(): Promise<NekoClient.NekoRequestResults>;
  gecg(): Promise<NekoClient.NekoRequestResults>;
}

export = NekoClient;

declare namespace NekoClient {
  //Help create options interface for the few functions that need it
  export interface NekoQueryParams {
    text: string;
  }
  export interface NekoRequestResults {
    url: string;
  }
  export interface NekoChatResults {
    response: string;
    url?: string;
  }
  export interface NekoCatResult {
    cat: string;
  }
  export interface NekoWhyResult {
    why: string;
  }
  export interface NekoOwOResult {
    owo: string;
  }
  export interface NekoFactResult {
    fact: string;
  }
}
