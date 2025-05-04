export interface FilmDetails {
  uid: string;
  description: string;
  properties: {
    title: string;
    episode_id: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    species: string[];
    vehicles: string[];
    url: string;
  }
}

export interface FilmResult {
  result: FilmDetails[];
}
