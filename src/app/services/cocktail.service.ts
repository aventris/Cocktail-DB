import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AlcoholicList } from '../models/list.model';
import { map, tap } from 'rxjs';

const API = environment.API;

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  constructor(private http: HttpClient) {}

  getFilterList(type: 'c' | 'g' | 'i' | 'a') {
    return this.http.get<[]>(`${API}/list.php?${type}=list`);
  }

  getCocktails() {
    return this.http.get<AlcoholicList>(`${API}/filter.php?a=Alcoholic`);
  }
}
