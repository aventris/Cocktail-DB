import { Component, Input, OnInit } from '@angular/core';
import { Alcoholic } from '../../../models/list.model';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.scss'],
})
export class CocktailItemComponent implements OnInit {
  @Input() cocktail!: Alcoholic;

  constructor() {
    console.log(this.cocktail);
  }

  ngOnInit(): void {
    console.log(this.cocktail);
  }
}
