import { Subject } from 'rxjs';
import { Ingredient } from './../shared/model/ingredient.model';
import { Recipe } from './model/recipe.model';
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

/*  private recipes: Recipe[] = [
    new Recipe(
    'SandWich',
    'This is simply a test',
     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
     [
      new Ingredient('Tomatoes', 5),
      new Ingredient('Rice', 5),
     ]),
    new Recipe('Burger',
     'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Rice', 5),
       ])
  ]; */
  private recipes: Recipe[] = [];
  constructor() { }

  setRecipes(recipes: Recipe[]): void{
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  // tslint:disable-next-line:typedef
  getRecipes(){
    return this.recipes.slice();
  }

  // tslint:disable-next-line: typedef
  getRecipe(index: number){
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe): void{
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe): void{
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number): void{
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
