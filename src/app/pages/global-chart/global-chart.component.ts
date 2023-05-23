import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-global-chart',
  templateUrl: './global-chart.component.html',
  styleUrls: ['./global-chart.component.css']
})
export class GlobalChartComponent {

  constructor(
    private adminSrv: AdminService,
    private router: Router
  ) { }

  p: number = 1;
  collection: any[] = [];
  globalData: Array<any> = [];
  puntajes: Array<any> = [];
  carreras: Array<any> = [];

  ngOnInit() {
    this.getGlobalData();
  }

  getGlobalData() {
    this.adminSrv.getGlobalData().subscribe(
      (resp: any) => {
        this.globalData = resp;
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          this.puntajes.push(element.puntaje);
          this.carreras.push(element.carrera);
        }
        this.renderData(this.puntajes);
        
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Ocurrió un error al obtener los datos', 'error');
      }
    );
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

  
  public renderData(puntajes?: any) { 
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
    const densityData = {
      // label: 'Afinidad global de programas',
      data: puntajes,
      backgroundColor: backgroundColors
    };
    
    this.renderChart(densityCanvas, densityData, puntajes);
  }

}

