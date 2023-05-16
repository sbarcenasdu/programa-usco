import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http:HttpClient) { }
  
  loadJSON(): Observable<any> {    
    return this.http.get<any>('assets/questions.json');
  }

  realiceSurvey(formData: any){
  localStorage.setItem('survey', JSON.stringify(formData));

  }
}
