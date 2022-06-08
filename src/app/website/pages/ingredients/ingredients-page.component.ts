import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.scss'],
})
export class IngredientsPageComponent implements OnInit {
  ingredients: any = [];

  constructor(
    private categoryService: CategoryService,
    private cocktailService: CocktailService
  ) {}

  ngOnInit(): void {
    this.categoryService.getIngredients().subscribe((data) => {
      //console.log(data);
      let ingredientArray = data.drinks.map((el) => el.strIngredient1);

      ingredientArray.sort((a: string, b: string) => {
        let str1 = a.toLowerCase();
        let str2 = b.toLowerCase();
        if (str1 < str2) return -1;
        else if (str1 > str2) return 1;
        return 0;
      });
      //console.log(sortedIngredients);

      this.ingredients = ingredientArray;
    });
  }
  getImgUrl(ingredient: string) {
    //console.log('Getting image: ', ingredient);
    return `http://www.thecocktaildb.com/images/ingredients/${encodeURI(
      ingredient
    )}-Medium.png`;
  }

  handleIngredientTag(tag: string) {
    console.log('click ', tag);
    this.cocktailService.getByTag('ingredient', tag);
  }
}
