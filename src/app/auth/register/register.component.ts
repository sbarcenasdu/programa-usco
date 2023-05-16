import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    cellphone: ['', Validators.required],
    document: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private route: Router, private regSrv: RegisterService) { }

  public registerUser(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    /*     this.regSrv.registerUser(this.registerForm.value).subscribe(resp => {
      this.route.navigateByUrl('/home/survey');
    }, (err) => {
      console.log(err);
    }
    ); */
    this.route.navigate(['/home/survey']);
  }
  
  public campoNoValido(campo: string): boolean {
    if(this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched){
      return true;
    }
    else{
      return false;
    }
  }

}
