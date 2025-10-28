import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { TypeEpisode, TypeFindParams, TypeGetAllEpisodes } from './types';

@Injectable({
  providedIn: 'root',
})
export class EpisodesApiService {
  private _baseUrl = `${environment.apiUrl}/episode`;

  constructor(private httpCLient: HttpClient) {}
  findAll(params: TypeFindParams) {
    return this.httpCLient.get<TypeGetAllEpisodes>(this._baseUrl, { params });
  }

  findOne(id: number) {
    return this.httpCLient.get<TypeEpisode>(`${this._baseUrl}/${id}`);
  }
}
