import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AlcoholicList } from '../models/list.model';
import { map, tap } from 'rxjs';

import { CocktailResponse } from '../models/cocktail.model';

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

  getOne(id: string) {
    return this.http
      .get<CocktailResponse>(`${API}/lookup.php?i=${id}`)
      .pipe(map((data) => data.drinks[0]));
  }
}
