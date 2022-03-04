export interface Category {
  drinks: [{ strCategory: string }];
}
export interface Glass {
  drinks: [{ strGlass: string }];
}
export interface Ingridient {
  drinks: [{ strIngredient1: string }];
}
export interface AlcoholicList {
  drinks: [
    {
      strAlcoholic: string;
      strDrink: string;
      strDrinkThumb: string;
      idDrink: string;
    }
  ];
}
export interface Alcoholic {
  strAlcoholic: string;
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}
