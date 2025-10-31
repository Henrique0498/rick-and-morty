import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeFindParams, TypeLocation } from './types';
import { BaseApiService } from '@core/services/apis/base-api.service';
import { TypeGetAll } from '../type';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService extends BaseApiService<
  TypeGetAll<TypeLocation>,
  TypeLocation,
  TypeFindParams
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/location`);
  }
}
