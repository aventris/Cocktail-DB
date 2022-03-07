import { Component, OnInit } from '@angular/core';

import { CocktailService } from '../../../services/cocktail.service';
import { Alcoholic } from '../../../models/list.model';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  loading = false;
  cocktails: any[] = [];
  test: Alcoholic[] = [];

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktailService.$cocktailList
      .pipe(
        switchMap((data) => {
          this.cocktails = data;
          return this.cocktailService.$loading;
        })
      )
      .subscribe((data) => {
        this.loading = data;
      });
    this.cocktailService.getCocktails();
  }
}
