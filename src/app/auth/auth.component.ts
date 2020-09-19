import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
isLoginMode = true;
isLoading = false;
error: string = null;
closeSub: Subscription;
@ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  onSubmit(form: NgForm): void{
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObser: Observable<AuthResponseData>;
    if (this.isLoginMode){
      authObser = this.authService.login(email, password);
    }
    else {
      authObser = this.authService.signup(email, password);
      this.isLoading = true;
    }
    authObser.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.error = null;
      this.router.navigate(['./recipes']);
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      this.showAlert(errorMessage);
    });
    form.reset();
    }


onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  showAlert(message: string): void{
    const AlerCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const  hostViewContainerRef = this.alertHost.viewerContainerRef;
    hostViewContainerRef.clear();
    const componentRef =  hostViewContainerRef.createComponent(AlerCompFactory);
    componentRef.instance.message = message;
    this.closeSub =  componentRef.instance.closeBox.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void{
    if (this.closeSub) { this.closeSub.unsubscribe(); }
  }
}
