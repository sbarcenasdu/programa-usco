import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  constructor(private surveySrv: SurveyService) { }

  public porcentajes: any;
  public carreras: any;
  public dataSurvey: any;

  ngOnInit() {
    // const data = this.getValues();
    this.porcentajes = this.surveySrv.porcentajes;
    this.carreras = this.surveySrv.carreras;
    this.dataSurvey = this.surveySrv.dataSurvey;
    const densityCanvas = document.getElementById("afinityChart") as HTMLCanvasElement;
    const densityData = {
      label: 'Afinidad de las carreras',
      data: this.porcentajes,
      backgroundColor: 'rgba(0, 123, 255, 0.6)'
    };
    this.renderChart(densityCanvas, densityData, this.porcentajes);

  }

  getValuesLocalStorage(): number[] {
    const respLocalStorage = localStorage.getItem('survey');
    if (!respLocalStorage) {
      console.log('No se encontraron valores en el LocalStorage.');
      return [];
    }
    try {
      const respuestaObjeto = JSON.parse(respLocalStorage);
      const data = respuestaObjeto.map((item: any) => parseFloat(item.respuesta));
      console.log('Valores almacenados en el array "data":', data);
      return data;
    } catch (error) {
      console.error('Error al parsear los valores del LocalStorage:', error);
      return [];
    }
  }




  renderChart(canvas: HTMLCanvasElement, chartData: any, data: number[]) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [
          'MEDICINA',
          'ENFERMERÍA',
          'ECONOMÍA',
          'ADM. EMPRESAS',
          'CONT. PÚBLICA',
          'ADM. FINANCIERA',
          'ADM. TURÍSTICA',
          'COM. SOCIAL',
          'PSICOLOGÍA',
          'ANTROPOLOGÍA',
          'DERECHO',
          'CIENCIA POLÍTICA',
          'MAT. APLICADA',
          'FÍSICA',
          'BIOLOGÍA APLICADA',
          'LIC. INGLÉS',
          'LIC. LITERATURA',
          'LIC. C. NATURALES',
          'LIC. ED. FÍSICA',
          'LIC. ED. ARTÍSTICA',
          'LIC. ED. INFANTIL',
          'LIC. MATEMÁTICAS',
          'LIC. C. SOCIALES',
          'ING. AGRÍCOLA',
          'ING. AGROINDUSTRIAL',
          'ING. ELECTRÓNICA',
          'ING. PETRÓLEOS',
          'ING. SOFTWARE',
          'ING. CIVIL',
          'TEC. DES. SOFTWARE',
          'TEC. CONST. CIVILES'
        ]
        ,
        datasets: [chartData]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
