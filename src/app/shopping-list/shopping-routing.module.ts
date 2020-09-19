import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { Routes, RouterModule } from '@angular/router';

const shoppingRoutes: Routes = [
    {path: '', component: ShoppingListComponent}
  ];
@NgModule({
    imports : [RouterModule.forChild(shoppingRoutes)],
    exports : [RouterModule]
})
export class ShoppingRouteModule{

}
