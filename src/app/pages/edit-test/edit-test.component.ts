import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SimulatorService } from 'src/app/services/simulator.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent {


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
  ){}

  calcularPond()
  {
    
    this.simulatorSrv.calcularPonderado(this.formPonderado.value).subscribe((response) => {
      this.careers = response
    }
    );
    
  }
}
