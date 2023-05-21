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

  p: number = 1;
  collection: any[] = [];
  public porcentajes: Array<any> = [];
  public carreras: Array<any> = [];
  public dataSurvey: Array<any> = [];
  public userDocument: any;
  public studentData: any;
  public documentData: any;

  ngOnInit() {
    // const data = this.getValues();
    this.userDocument = localStorage.getItem('userDocument');
    this.studentData = localStorage.getItem('studentData');

    // desde ADMIN consulta por cedula STUDENT-RESULTS
    if (this.studentData !== null) {
      this.dataSurvey = JSON.parse(this.studentData);//[{}...]
      console.log(this.dataSurvey);
      // console.log(this.dataSurvey[0].carrera);
      for (const key in this.dataSurvey) {
        if (Object.prototype.hasOwnProperty.call(this.dataSurvey, key)) {
          const element = this.dataSurvey[key];
          this.porcentajes.push(element.porcentaje);
          this.carreras.push(element.carrera);
        }
      }
      this.renderData();
    }
    //desde SURVEY
    else if (this.surveySrv.porcentajes.length > 0) {
      this.porcentajes = this.surveySrv.porcentajes;
      this.carreras = this.surveySrv.carreras;
      this.dataSurvey = this.surveySrv.dataSurvey;
      this.renderData();
    }

    // desde LOGIN
    else {
      this.surveySrv.getSurvey(this.userDocument).subscribe((resp: any) => {
        this.dataSurvey = resp;
        for (const key in resp) {
          if (Object.prototype.hasOwnProperty.call(resp, key)) {
            const element = resp[key];
            this.porcentajes.push(element.porcentaje);
            this.carreras.push(element.carrera);
          }
        }
        this.renderData();
      });
    }
  }

  public renderData() {
    const densityCanvas = document.getElementById("afinityChart") as HTMLCanvasElement;
    const backgroundColors = [
      'rgba(255, 0, 0, 0.6)',
      'rgba(0, 255, 0, 0.6)',
      'rgba(0, 0, 255, 0.6)',
      'rgba(255, 255, 0, 0.6)',
      'rgba(0, 255, 255, 0.6)',
      'rgba(255, 0, 255, 0.6)',
      'rgba(128, 0, 0, 0.6)',
      'rgba(0, 128, 0, 0.6)',
      'rgba(0, 0, 128, 0.6)',
      'rgba(0, 128, 128, 0.6)',
      'rgba(128, 0, 128, 0.6)',
      'rgba(255, 128, 0, 0.6)',
      'rgba(255, 0, 128, 0.6)',
      'rgba(128, 255, 0, 0.6)',
      'rgba(0, 255, 128, 0.6)',
      'rgba(128, 0, 255, 0.6)',
      'rgba(0, 128, 255, 0.6)'
    ];
    //const labels = this.carreras.map(carrera => carrera.nombre);
    const densityData = { 
      // label: 'Afinidad de programas',
      //labels: labels,
      data: this.porcentajes,
      backgroundColor: backgroundColors
    };
    this.renderChart(densityCanvas, densityData, this.porcentajes);
  }

  renderChart(canvas: HTMLCanvasElement, chartData: any, data: number[]) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.carreras,
        datasets: [chartData]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Afinidad de programas'
          },
          legend: {
            display: false
          }
        }
      }
    });
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
}
