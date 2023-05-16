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
      name: formData.name,
      email: formData.email,
      cellphone: formData.cellphone,
      document: formData.document
    }
    return this.http.post(`${URL}/users`, json).pipe(
     map(resp => resp));
  }
}
