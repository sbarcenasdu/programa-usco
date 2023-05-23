import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    // Verifica si el usuario está autenticado
    /* if (this.authService.isAuthenticated()) {
      // Si el usuario está autenticado, redirige a la página de inicio o a la ruta que desees
      this.router.navigate(['/home']);
      return false;
    } */
    
    // Si el usuario no está autenticado, permite el acceso al componente de login
    return true;
  }
}
