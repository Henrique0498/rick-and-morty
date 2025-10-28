export type TypeFindParams = {
  page: number;
  name?: string;
  type?: string;
  dimension?: string;
};

export interface TypeEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface TypeGetAllEpisodes {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TypeEpisode[];
}
