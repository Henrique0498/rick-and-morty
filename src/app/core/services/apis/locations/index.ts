import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { TypeFindParams, TypeGetAllLocations, TypeLocation } from './types';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  private _baseUrl = `${environment.apiUrl}/location`;

  constructor(private httpCLient: HttpClient) {}
  findAll(params: TypeFindParams) {
    return this.httpCLient.get<TypeGetAllLocations>(this._baseUrl, { params });
  }

  findOne(id: number | string) {
    return this.httpCLient.get<TypeLocation>(`${this._baseUrl}/${id}`);
  }
}
