import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoryService } from '../../../services/category.service';

const MAP_FILTER_TYPE = {
  a: 'alcoholic',
  c: 'category',
  g: 'glass',
  i: 'ingredient',
};

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
})
export class FilterListComponent implements OnInit {
  filters: any[] = [];
  @Input() type!: 'c' | 'g' | 'i' | 'a';
  @Input() title: string = '';
  @Output() handleTagClick = new EventEmitter();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getFilterList();
  }

  getFilterList() {
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
        this.categoryService.getIngredients().subscribe((data) => {
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

  onClick(tag: string) {
    this.handleTagClick.emit({ type: MAP_FILTER_TYPE[this.type], tag: tag });
  }
}
