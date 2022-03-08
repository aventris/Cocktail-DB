import { Injectable } from '@angular/core';
import { BehaviorSubject, map, pipe, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { AlcoholicList } from '../models/list.model';

import { CocktailResponse } from '../models/cocktail.model';
import { DataMappingService } from './data-mapping.service';

import { Router } from '@angular/router';
const API = environment.API;

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private cocktailList = new BehaviorSubject(<any>[]);
  private loading = new BehaviorSubject(false);

  $cocktailList = this.cocktailList.asObservable();
  $loading = this.loading.asObservable();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {}

  getFilterList(type: 'c' | 'g' | 'i' | 'a') {
    return this.http.get<[]>(`${API}/list.php?${type}=list`);
  }

  getCocktails() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      let data: string | null = null;
      let filter: string | null = null;
      if (params['search_c']) {
        data = params['search_c'];
        filter = 's';
      } else if (params['search_i']) {
        data = params['search_i'];
        filter = 'i';
      }
      if (data && filter) {
        this.getByName(filter, data);
      } else this.getAlcoholic();
    });
  }

  getAlcoholic() {
    this.http
      .get<AlcoholicList>(`${API}/filter.php?a=Alcoholic`)
      .subscribe((data) => {
        this.cocktailList.next({
          ...data,
          title: 'Alcoholic',
          subtitle: 'Category',
        });
      });
  }

  getOne(id: string) {
    return this.http
      .get<CocktailResponse>(`${API}/lookup.php?i=${id}`)
      .pipe(map((data) => data.drinks[0]));
  }

  getByName(filter: string, search: string) {
    let queryStr = 'i' === filter ? 'filter.php' : 'search.php';
    this.loading.next(true);
    this.http
      .get<CocktailResponse>(`${API}/${queryStr}?${filter}=${search}`)
      .subscribe((data) => {
        if (data) {
          this.cocktailList.next({
            ...data,
            title: search,
            subtitle: `Search ${
              queryStr === 'i' ? 'by ingredient' : 'by name'
            }`,
          });
          this.loading.next(false);
        }
      });
  }

  getByTag(type: string, tag: string) {
    console.log('Service: ', type, tag);
    let urlFilter = this.dataMappingService.MapFilter(type);
    let url = `${API}/${urlFilter}=${encodeURIComponent(tag)}`;
    this.http.get<any>(url).subscribe((data) => {
      if (data) {
        this.cocktailList.next({
          ...data,
          title: decodeURI(tag),
          subtitle: type,
        });
        this.router.navigate([], {
          queryParams: {
            search_c: null,
            search_i: null,
            cocktail: null,
            filter: type,
            tag: tag,
          },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  // TODO

  // Put tags on cocktail details. Make an menu and queryparams handler to remove them when something happens
}
