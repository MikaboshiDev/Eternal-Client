declare module 'animelist' {
  namespace anime {
    export function animeRandom(): Promise<any>;
    export function animeSearch(id: number): Promise<any>;
    export function animeRecommended(): Promise<any>;
  }

  namespace manga {
    export function mangaRandom(): Promise<any>;
    export function mangaSearch(id: number): Promise<any>;
    export function mangaRecommended(): Promise<any>;
  }
}
