import { Injectable } from '@angular/core';
import { RegisterForm } from '../models/form-registro.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const URL: string = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient) { }

  public registerUser(formData: any){ 
    const json = {
      userName: formData.name,
      userEmail: formData.email,
      userDocument: formData.document,
      cellphone: formData.phoneNumber,
      role:"",
      password: formData.password
    }
    return this.http.post(`${URL}/v1/user`, json).pipe(
     map(resp => resp));
  }
}
