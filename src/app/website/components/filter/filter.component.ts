import { Component, OnInit } from '@angular/core';

import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  menuIsOpen = false;

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {}

  toggleTag() {
    this.menuIsOpen = !this.menuIsOpen;
  }
  closeMenu() {
    this.menuIsOpen = false;
  }
  handleAlcoholicTag(event: any) {
    this.cocktailService.getByTag('alcoholic', event.tag);
    this.closeMenu();
  }
  handleIngredientTag(event: any) {
    this.cocktailService.getByTag('ingredient', event.tag);
    this.closeMenu();
  }
  handleCategoryTag(event: any) {
    this.cocktailService.getByTag('category', event.tag);
    this.closeMenu();
  }
  handleGlassTag(event: any) {
    this.cocktailService.getByTag('glass', event.tag);
    this.closeMenu();
  }
}
