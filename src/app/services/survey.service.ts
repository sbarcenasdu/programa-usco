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

  porcentajes: any[] = [];
  carreras: any[] = [];
  dataSurvey: any;
  userDocument: any;

  loadJSON(): Observable<any> {
    return this.http.get<any>('assets/questionsC.json');
  }

  realiceSurvey(formData: any) {
    const json = formData.map((data: any) => ({
      carrera: data.carrera,
      puntaje: data.puntaje
    }));
    //const userDocument = window.localStorage.getItem('userDocument');
    console.log(this.userDocument);
    return this.http.post(`${URL}/v1/data/masive/${this.userDocument}`, json).pipe(
      map(resp => resp)
    );
  }

  getSurvey(userDocument:any){
    return this.http.get(`${URL}/v1/data/byuser/${userDocument}`).pipe(
      map(resp => resp)
    );

  }
}
