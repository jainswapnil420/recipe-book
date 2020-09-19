import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const authRoutes: Routes = [
    {path: '', component: AuthComponent}
  ];
@NgModule({
    imports : [RouterModule.forChild(authRoutes)],
    exports : [RouterModule]
})
export class AuthRountingModule{

}
