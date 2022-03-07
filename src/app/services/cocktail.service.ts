import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private cocktailList = new BehaviorSubject(<any>[]);
  private loading = new BehaviorSubject(false);

  $cocktailList = this.cocktailList.asObservable();
  $loading = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getFilterList(type: 'c' | 'g' | 'i' | 'a') {
    return this.http.get<[]>(`${API}/list.php?${type}=list`);
  }

  getCocktails() {
    this.http
      .get<AlcoholicList>(`${API}/filter.php?a=Alcoholic`)
      .subscribe((data) => {
        this.cocktailList.next(data.drinks);
      });
  }

  getOne(id: string) {
    return this.http
      .get<CocktailResponse>(`${API}/lookup.php?i=${id}`)
      .pipe(map((data) => data.drinks[0]));
  }

  getByName(filter: string, data: string) {
    let queryStr = 'i' === filter ? 'filter.php' : 'search.php';
    this.loading.next(true);
    this.http
      .get<CocktailResponse>(`${API}/${queryStr}?${filter}=${data}`)
      .subscribe((data) => {
        let aux = data.drinks;
        this.cocktailList.next(aux);
        this.loading.next(false);
      });
  }
}
