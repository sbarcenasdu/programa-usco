import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL: string = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  constructor(private http: HttpClient) { }

  calcularPonderado(formData: any) {
    const json = 
    {
      "lecturaCritica": parseInt(formData.lecturaCritica),
      "cienciasNaturales": parseInt(formData.cienciasNaturales),
      "cienciasSociales": parseInt(formData.cienciasSociales),
      "matematicas": parseInt(formData.matematicas),
      "ingles": parseInt(formData.ingles)
    }

    return this.http.post(`${URL}/v1/career/ponderados`, json).pipe(
      map(resp => resp)
    );
  }
}
