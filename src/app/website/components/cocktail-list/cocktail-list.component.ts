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
  title: string = '';
  subtitle: string = '';

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktailService.$cocktailList
      .pipe(
        switchMap((data) => {
          this.cocktails = data.drinks;
          this.title = data.title;
          this.subtitle = data.subtitle;
          return this.cocktailService.$loading;
        })
      )
      .subscribe((data) => {
        this.loading = data;
      });
    //this.cocktailService.getCocktails();
  }
}
