import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients: any;
  @Input() measures: any;
  @Output() onClose = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.ingredients, this.measures);
  }

  getImgUrl(ingredient: string) {
    return `http://www.thecocktaildb.com/images/ingredients/${encodeURI(
      ingredient
    )}-Medium.png`;
  }

  onClick() {
    this.onClose.emit();
  }
}
