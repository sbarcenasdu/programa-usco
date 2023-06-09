import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService

  ) { }

  ngOnInit(): void {
  }

  public formSubmitted: Boolean = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authSrv.login(this.loginForm.value).subscribe((resp: any) => {
      if (resp.length === 0) {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      } else {
        if (resp[0].role === 'ADMIN') {
          this.authSrv.isSD = false;
          this.authSrv.setAdminUser(true);
          localStorage.setItem('isAdminLoggedIn', 'true');
          this.router.navigateByUrl('/home/admin-edit');
        }
        else {
          localStorage.setItem('userDocument', resp[0].userDocument);
          localStorage.setItem('isStandardLoggedIn', 'true');
          setTimeout(() => {
            this.router.navigateByUrl('/home/charts');
          }, 300);
        }
      }
    }, (err) => {
      Swal.fire('Error', 'Error al iniciar sesión', 'error');
    })
  }




  public campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched) {
      return true;
    }
    else {
      return false;
    }
  }

}