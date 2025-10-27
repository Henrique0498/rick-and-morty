import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { TypeCharacter, TypeFindParams, TypeGetAllCharacters } from './types';

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService {
  private _baseUrl = `${environment.apiUrl}/character`;

  constructor(private httpCLient: HttpClient) {}
  findAll(params: TypeFindParams) {
    return this.httpCLient.get<TypeGetAllCharacters>(this._baseUrl, { params });
  }

  findOne(id: number) {
    return this.httpCLient.get<TypeCharacter>(`${this._baseUrl}/${id}`);
  }
}
