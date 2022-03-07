import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
})
export class FilterItemComponent implements OnInit {
  @Input() filter: any = null;
  string = '';
  constructor() {}
  ngOnInit(): void {
    if (this.filter.strCategory) this.string = this.filter.strCategory;
    else if (this.filter.strGlass) this.string = this.filter.strGlass;
    else if (this.filter.strIngredient1)
      this.string = this.filter.strIngredient1;
    else if (this.filter.strAlcoholic) this.string = this.filter.strAlcoholic;
  }
}
