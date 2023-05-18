import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
import { RegisterResponse } from './register-response.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private regSrv: RegisterService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      residence: ['', Validators.required],
      birthdate: ['', Validators.required],
      placeBirth: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public registerUser() {
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.regSrv.registerUser(this.registerForm.value).subscribe(
      (resp: Object) => {
        console.log(resp);
        const idUser = (resp as RegisterResponse).idUser;
        console.log(idUser);
        Swal.fire('Éxito', 'Registro exitoso', 'success');
        this.route.navigateByUrl('/home/survey');
      },
      (err) => {
        console.log(err);
        Swal.fire('Error', 'Usuario ya existe', 'error');
      }
    );
  }

  public campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
