import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SimulatorService } from 'src/app/services/simulator.service';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent {

  public careers: any = [];
  public formPonderado = this.fb.group({
    lecturaCritica: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    cienciasNaturales: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    cienciasSociales: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    matematicas: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    ingles: new FormControl(0, [Validators.min(0), Validators.max(100)]),
  });

  constructor(
    private fb: FormBuilder,
    private simulatorSrv: SimulatorService
  ) { }

  calcularPond(event: Event) {
    event.preventDefault();
    this.simulatorSrv.calcularPonderado(this.formPonderado.value).subscribe((response) => {
      this.careers = response;
    });
  }

  validateNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (value > 100 || value < 0 || isNaN(value) || value.toString().length > 5) {
      input.value = '';
    }
  }




}
