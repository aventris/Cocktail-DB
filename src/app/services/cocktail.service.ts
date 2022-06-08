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
  private prevParams: any = {};

  $cocktailList = this.cocktailList.asObservable();
  $loading = this.loading.asObservable();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {}

  updateCocktailList(params: any) {
    //debugger;
    if (Object.keys(params).length > 0) {
      // Check if query params contain filter and tag
      if (params['filter'] && params['tag']) {
        if (
          params['filter'] !== this.prevParams['filter'] ||
          params['tag'] !== this.prevParams['tag']
        ) {
          this.getByTag(params['filter'], params['tag']);
        }
        // Check if query params contain search_c
      } else if (params['search_c']) {
        if (params['search_c'] !== this.prevParams['search_c']) {
          this.getByName('s', params['search_c']);
        }
        // Check if query params contain search_i
      } else if (params['search_i']) {
        if (params['search_i'] !== this.prevParams['search_i']) {
          this.getByName('i', params['search_i']);
        }
      }
      // There's no query params
    } else {
      if (!this.prevParams['cocktail']) this.getAlcoholic();
    }
    //console.log('Current params', params);
    this.prevParams = params;
  }

  getFilterList(type: 'c' | 'g' | 'i' | 'a') {
    return this.http.get<[]>(`${API}/list.php?${type}=list`);
  }

  getAlcoholic() {
    this.http
      .get<AlcoholicList>(`${API}/filter.php?a=Alcoholic`)
      .subscribe((data) => {
        console.log('Fetch By Alcoholic');
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
    console.log('busqueda: ', filter, search);
    let queryStr = 'i' === filter ? 'filter.php' : 'search.php';
    this.loading.next(true);
    this.http
      .get<CocktailResponse>(`${API}/${queryStr}?${filter}=${search}`)
      .subscribe((data) => {
        console.log('Fetch By Name');
        if (data) {
          this.cocktailList.next({
            ...data,
            title: search,
            subtitle: `Search ${filter === 'i' ? 'by ingredient' : 'by name'}`,
          });
          this.loading.next(false);
        }
      });
  }

  getByTag(type: string, tag: string) {
    let urlFilter = this.dataMappingService.mapAPIFilter(type);
    let url = `${API}/${urlFilter}=${encodeURIComponent(tag)}`;
    this.http.get<any>(url).subscribe((data) => {
      console.log('Fetch By tag');
      if (data) {
        this.cocktailList.next({
          ...data,
          title: decodeURI(tag),
          subtitle: type,
        });
        this.setURLQueryParams(type, tag);
      }
    });
  }

  setURLQueryParams(type: string, tag: string) {
    this.router.navigate(['/home'], {
      queryParams: {
        search_c: null,
        search_i: null,
        filter: type,
        tag: tag,
      },
      queryParamsHandling: 'merge',
    });
  }

  // TODO

  // Put tags on cocktail details. Make an menu and queryparams handler to remove them when something happens
}
