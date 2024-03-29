declare module 'animelist' {
  namespace anime {
    export function animeSearch(id: number): Promise<unknown>;
    export function animeRecommended(): Promise<unknown>;
    export function animeRandom(): Promise<unknown>;
  }

  namespace manga {
    export function mangaSearch(id: number): Promise<unknown>;
    export function mangaRecommended(): Promise<unknown>;
    export function mangaRandom(): Promise<unknown>;
  }
}
