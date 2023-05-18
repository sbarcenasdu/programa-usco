import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const URL: string = environment.URL_API;

@Injectable({
  providedIn: 'root'
})

export class SurveyService {

  constructor(private http: HttpClient) { }

  loadJSON(): Observable<any> {
    return this.http.get<any>('assets/questions.json');
  }

  realiceSurvey(formData: any) {
    const json = formData.map((data: any) => ({
      carrera: data.carrera,
      puntaje: data.puntaje
    }));
    console.log(json);
    return;
    return this.http.post(`${URL}/v1/data/masive/${formData.userID}`, json).pipe(
      map(resp => resp)
    );
  }
  




}
