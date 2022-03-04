import { Component, Input, OnInit } from '@angular/core';

import { CategoryService } from '../../../services/category.service';
import {
  Category,
  Glass,
  Ingridient,
  Alcoholic,
} from '../../../models/list.model';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent implements OnInit {
  filters: any[] = [];
  @Input() type!: 'c' | 'g' | 'i' | 'a';
  @Input() title: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getFilterList();
  }

  getFilterList() {
    console.log(this.type);
    switch (this.type) {
      case 'c':
        this.categoryService.getCategories().subscribe((data) => {
          this.filters = data.drinks;
        });
        break;
      case 'g':
        this.categoryService.getGlasses().subscribe((data) => {
          this.filters = data.drinks;
        });
        break;
      case 'i':
        this.categoryService.getIngridients().subscribe((data) => {
          this.filters = data.drinks;
        });
        break;
      case 'a':
        this.categoryService.getAlcoholic().subscribe((data) => {
          this.filters = data.drinks;
        });
        break;
    }
  }
}
