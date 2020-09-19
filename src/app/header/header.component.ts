import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data.storage-service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticate = false;
private userSub: Subscription;

constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

ngOnInit(): void {
  this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticate = !!user;
  });

}
  onSaveData(): void{
    this.dataStorageService.storeRecipes();
  }
  onFetchRecipes(): void{
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy(): void{
    this.userSub.unsubscribe();
  }
  onLogout(): void {
    this.authService.logout();
  }
}
