import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss'],
})
export class IngredientsPageComponent implements OnInit {
  allIngredients: any = [];
  ingredientList: Array<string> = [];
  searchString: string = '';

  constructor(
    private categoryService: CategoryService,
    private cocktailService: CocktailService
  ) {}

  ngOnInit(): void {
    this.categoryService.getIngredients().subscribe((data) => {
      let ingredientArray = data.drinks.map((el) => el.strIngredient1);

      ingredientArray.sort((a: string, b: string) => {
        let str1 = a.toLowerCase();
        let str2 = b.toLowerCase();
        if (str1 < str2) return -1;
        else if (str1 > str2) return 1;
        return 0;
      });

      this.allIngredients = this.ingredientList = ingredientArray;
    });
  }
  getImgUrl(ingredient: string) {
    return `http://www.thecocktaildb.com/images/ingredients/${encodeURI(
      ingredient
    )}-Medium.png`;
  }

  handleIngredientTag(tag: string) {
    console.log('click ', tag);
    this.cocktailService.getByTag('ingredient', tag);
  }

  handleSearch(e: Event) {
    e.preventDefault();
    if (this.searchString.length === 0)
      this.ingredientList = this.allIngredients;
    else {
      let aux = [...this.allIngredients];
      this.ingredientList = aux.filter((ingredient) =>
        ingredient.toLowerCase().includes(this.searchString.toLowerCase())
      );
    }
  }
}
