import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isStandardLoggedIn: boolean = localStorage.getItem('isStandardLoggedIn') === 'true';
    if (this.authService.isLoggedIn() || isStandardLoggedIn) {
      return true;
    } else {
      console
      this.router.navigate(['/home']);
      return false;
    }
  }
}
