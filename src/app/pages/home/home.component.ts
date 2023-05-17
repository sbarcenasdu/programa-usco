import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authSrv: AuthService
  ) {}
  
  roleVerification(role: any) {
    if (role == 'SD') {
      this.authSrv.isSD = true;
      this.authSrv.isAdmin = false;
    }
    else {
      this.authSrv.isAdmin = true;
      this.authSrv.isSD = false;
    }
  }

}
