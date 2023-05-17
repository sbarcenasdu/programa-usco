import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

const BASE_URL: String = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public httpOptions: any = {};
  isAdmin: boolean = false;
  isSD: boolean = false;

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  public login = (formData: any) => {
    const json = {
      email: formData.User,
      password: formData.Password
    }
    return this.http.post(`${BASE_URL}/login`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }
}