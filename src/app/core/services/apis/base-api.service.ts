import { HttpClient } from '@angular/common/http';

export abstract class BaseApiService<
  TListResponse,
  TItemResponse,
  TFindParams extends Record<string, any>
> {
  constructor(protected httpClient: HttpClient, private baseUrl: string) {}

  findAll(params: TFindParams) {
    return this.httpClient.get<TListResponse>(this.baseUrl, { params });
  }

  findOne(id: number | string) {
    return this.httpClient.get<TItemResponse>(`${this.baseUrl}/${id}`);
  }
}
