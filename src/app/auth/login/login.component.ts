import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted: Boolean = false;
  public btnLoading: Boolean = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService

  ) { }

  ngOnInit(): void {
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.btnLoading = true;
    this.authSrv.login(this.loginForm.value).subscribe((resp: any) => {
      console.log(resp[0].role);
      
      if (resp.length === 0) {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
        this.btnLoading = false;
      } else {
        if (resp[0].role === 'ADMIN') {
          this.authSrv.isSD = false;
          this.router.navigateByUrl('/home/admin-edit');
        }
        else {
          localStorage.setItem('userDocument', resp[0].userDocument);
           this.router.navigateByUrl('/home/charts');
          //Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
        }
      }
    }, (err) => {
      Swal.fire('Error', 'Error al iniciar sesión', 'error');
      this.btnLoading = false;
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