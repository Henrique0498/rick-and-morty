export interface TypeGetAll<T> {
  info: TypeInfoResponse;
  results: T[];
}

type TypeInfoResponse = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
