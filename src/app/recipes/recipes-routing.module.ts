import { NgModule } from '@angular/core';
import { RecipeResolverService } from './recipes.resolver';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from './../auth/auth.guard';
import { RecipesComponent } from './recipes.component';
import { Routes, RouterModule } from '@angular/router';

const recipeRoutes: Routes = [
    {path: '', component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent , resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
];
@NgModule({
    imports : [RouterModule.forChild(recipeRoutes)],
    exports : [RouterModule]
})
export class RecipeRountingModule{

}
