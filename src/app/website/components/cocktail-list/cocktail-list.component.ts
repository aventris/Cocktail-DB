import { Component, OnInit } from '@angular/core';

import { CocktailService } from '../../../services/cocktail.service';
import { Alcoholic } from '../../../models/list.model';
@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  cocktails: any[] = [];
  test: Alcoholic[] = [];

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe((data) => {
      this.cocktails = data.drinks;
      this.test = data.drinks;
    });
  }
}
