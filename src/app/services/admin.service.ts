import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL: string = environment.URL_API

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllStudents() {
    return this.http.get(`${URL}/v1/user`).pipe(
      map(resp => resp));
  }

  public getStudentData(userDocument: any) {
    return this.http.get(`${URL}/v1/data/byuser/${userDocument}`).pipe(
      map(resp => resp));
  }

  public getGlobalData() {
    return this.http.get(`${URL}/v1/data/report`).pipe(
      map(resp => resp));
  }

  public addProgram(formData: any) {
    const json = {
      userName: formData.name,
      userEmail: formData.email,
      userDocument: formData.document,
      cellphone: formData.phoneNumber,
      role:"",
      password: formData.password
    }
    return this.http.post(`${URL}/v1/data/report`, json).pipe(
      map(resp => resp));
  }

}
