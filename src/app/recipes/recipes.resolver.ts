import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data.storage-service';
import { Recipe } from './model/recipe.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]>{
constructor(private datastorageService: DataStorageService, private recipeService: RecipeService){}

// tslint:disable-next-line:typedef
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0){
        return this.datastorageService.fetchRecipes();
    }else{
        // tslint:disable-next-line:no-unused-expression
       return recipes;
    }
}
}
