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
    lecturaCritica: new FormControl(0),
    cienciasNaturales: new FormControl(0),
    cienciasSociales: new FormControl(0),
    matematicas: new FormControl(0),
    ingles: new FormControl(0),
  });

  constructor(
    private fb: FormBuilder,
    private simulatorSrv: SimulatorService
  ) { }

  calcularPond() {
    this.simulatorSrv.calcularPonderado(this.formPonderado.value).subscribe((response) => {
      this.careers = response
    }
    );
  }

  validateInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value + event.key;
    const valid = /^(\d{1,2}(\.\d{0,2})?|100(\.0{0,2})?)$/.test(value);
    if (!valid) {
      event.preventDefault();
    }
  }
  

}
