import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
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

  getCareers() {
    // return this.http.get(`${URL}/v1/career`).pipe(
    //   map(resp => resp));
    return this.http.get(`${URL}/v1/career`).pipe(
      tap((resp: any) => {
        return resp.sort((a: any, b: any) => a.title.localeCompare(b.title));
      })
    );
  }

  addCareer(formData: any) {
    const json = {
      title: formData.title,
      lecturaCritica: formData.lecturaCritica,
      cienciasNaturales: formData.cienciasNaturales,
      cienciasSociales: formData.cienciasSociales,
      matematicas: formData.matematicas,
      ingles: formData.ingles,
      puntajePonderado: 0,
      puntaCorte1: formData.puntaCorte1,
      puntaCorte2: formData.puntaCorte2,
      faculty: "f4b13c51-f8e6-401e-a476-7472bc5b9bcd"
    }
    return this.http.post(`${URL}/v1/career`, json).pipe(
      map(resp => resp));
  }


  updateCareer(career: any, formData: any, i: number) {
    /*     console.log(formData);
        const json = {
          title: career.title,
          lecturaCritica: formData.lecturaCritica +""+ (i + 1),
          cienciasNaturales: formData.cienciasNaturales,
          cienciasSociales: formData.cienciasSociales,
          matematicas: formData.matematicas,
          ingles: formData.ingles,
          puntajePonderado: formData.puntajePonderado,
          puntaCorte1: formData.puntaCorte1,
          puntaCorte2: formData.puntaCorte2,
          faculty: career.faculty.id
        } */
    const indice = i + 1;
    const json: any = {};
    for (const prop in formData) {
      if (indice < 10) {
        if (prop.endsWith(indice.toString())) {
          json[prop.substring(0, prop.length - 1)] = formData[prop];
        }
      } else {
        if (prop.endsWith(indice.toString())) {
          json[prop.substring(0, prop.length - 2)] = formData[prop];
        }
      }
    }
    console.log(json);

    json.title = career.title;
    json.faculty = career.faculty.id;
    console.log(json);

    return this.http.put(`${URL}/v1/career/${career.id}`, json).pipe(
      map(resp => resp));
  }

  updateCareert(formData: any) {
    return this.http.put(`${URL}/v1/career/${formData.id}`, formData).pipe(
      map(resp => resp));
  }



  deleteCareer(id: any) {
    return this.http.delete(`${URL}/v1/career/${id}`).pipe(
      map(resp => resp));
  }

}
