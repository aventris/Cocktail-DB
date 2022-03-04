import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {
  Category,
  Glass,
  Ingridient,
  AlcoholicList,
} from '../models/list.model';
const API = environment.API;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category>(`${API}/list.php?c=list`);
  }

  getGlasses() {
    return this.http.get<Glass>(`${API}/list.php?g=list`);
  }

  getIngridients() {
    return this.http.get<Ingridient>(`${API}/list.php?i=list`);
  }

  getAlcoholic() {
    return this.http.get<AlcoholicList>(`${API}/list.php?a=list`);
  }
}
