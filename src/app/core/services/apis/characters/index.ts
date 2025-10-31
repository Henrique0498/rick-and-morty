import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCharacter, TypeFindParams } from './types';
import { BaseApiService } from '@core/services/apis/base-api.service';
import { TypeGetAll } from '../type';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService extends BaseApiService<
  TypeGetAll<TypeCharacter>,
  TypeCharacter,
  TypeFindParams
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/character`);
  }
}
