import { Component, OnInit } from '@angular/core';

import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit {
  filterIsOpen = false;
  searchText = '';
  filterType = 'Cocktail';
  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {}

  toggleFilter() {
    this.filterIsOpen = !this.filterIsOpen;
  }

  handleFilter(type: string) {
    this.filterType = type;
    this.filterIsOpen = false;
  }

  onSubmit() {
    const filter = this.filterType === 'Cocktail' ? 's' : 'i';
    this.cocktailService.getByName(filter, this.searchText);
  }
}
