export type TypeFindParams = {
  page: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'male' | 'female' | 'genderless' | 'unknown';
};

type TypeLocation = {
  name: string;
  url: string;
};

export interface TypeCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: TypeLocation;
  location: TypeLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface TypeGetAllCharacters {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TypeCharacter[];
}
