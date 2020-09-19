import { SharedModule } from './../shared/shared.module';
import { AuthRountingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
    AuthComponent
    ],
    imports: [FormsModule, CommonModule, AuthRountingModule, SharedModule]
})
export class AuthModule{}
