export type TypeFindParams = {
  page: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'male' | 'female' | 'genderless' | 'unknown';
};

export interface TypeLocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
