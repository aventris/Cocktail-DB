import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataMappingService {
  constructor() {}

  mapIngredients(
    type: string
  ):
    | 'strIngredient1'
    | 'strIngredient2'
    | 'strIngredient3'
    | 'strIngredient4'
    | 'strIngredient5'
    | 'strIngredient6'
    | 'strIngredient7'
    | 'strIngredient8'
    | 'strIngredient9'
    | 'strIngredient10'
    | 'strIngredient11'
    | 'strIngredient12'
    | 'strIngredient13'
    | 'strIngredient14' {
    return type === '1'
      ? 'strIngredient1'
      : type === '2'
      ? 'strIngredient2'
      : type === '3'
      ? 'strIngredient3'
      : type === '4'
      ? 'strIngredient4'
      : type === '5'
      ? 'strIngredient5'
      : type === '6'
      ? 'strIngredient6'
      : type === '7'
      ? 'strIngredient7'
      : type === '8'
      ? 'strIngredient8'
      : type === '9'
      ? 'strIngredient9'
      : type === '10'
      ? 'strIngredient10'
      : type === '11'
      ? 'strIngredient11'
      : type === '12'
      ? 'strIngredient12'
      : type === '13'
      ? 'strIngredient13'
      : 'strIngredient14';
  }
  mapMeasures(
    type: string
  ):
    | 'strMeasure1'
    | 'strMeasure2'
    | 'strMeasure3'
    | 'strMeasure4'
    | 'strMeasure5'
    | 'strMeasure6'
    | 'strMeasure7'
    | 'strMeasure8'
    | 'strMeasure9'
    | 'strMeasure10'
    | 'strMeasure11'
    | 'strMeasure12'
    | 'strMeasure13'
    | 'strMeasure14' {
    return type === '1'
      ? 'strMeasure1'
      : type === '2'
      ? 'strMeasure2'
      : type === '3'
      ? 'strMeasure3'
      : type === '4'
      ? 'strMeasure4'
      : type === '5'
      ? 'strMeasure5'
      : type === '6'
      ? 'strMeasure6'
      : type === '7'
      ? 'strMeasure7'
      : type === '8'
      ? 'strMeasure8'
      : type === '9'
      ? 'strMeasure9'
      : type === '10'
      ? 'strMeasure10'
      : type === '11'
      ? 'strMeasure11'
      : type === '12'
      ? 'strMeasure12'
      : type === '13'
      ? 'strMeasure13'
      : 'strMeasure14';
  }

  mapInstructions(
    type: string
  ):
    | 'strInstructions'
    | 'strInstructionsES'
    | 'strInstructionsDE'
    | 'strInstructionsFR'
    | 'strInstructionsIT' {
    return type === 'EN'
      ? 'strInstructions'
      : type === 'ES'
      ? 'strInstructionsES'
      : type === 'DE'
      ? 'strInstructionsDE'
      : type === 'FR'
      ? 'strInstructionsFR'
      : 'strInstructionsIT';
  }

  mapAPIFilter(type: string): string {
    return type === 'search_i'
      ? 'filter.php?i'
      : type === 'alcoholic'
      ? 'filter.php?a'
      : type === 'category'
      ? 'filter.php?c'
      : type === 'ingredient'
      ? 'filter.php?i'
      : 'filter.php?g'; //glass
  }
}
