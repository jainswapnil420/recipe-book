import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { RecipeResolverService } from './recipes/recipes.resolver';
import { DataStorageService } from './shared/data.storage-service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        DataStorageService,
        RecipeResolverService,
        AuthService,
        AuthGuard,
       {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ]
})
export class CoreModule{

}
