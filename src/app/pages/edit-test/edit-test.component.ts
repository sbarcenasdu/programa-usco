import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
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
    puntPoderado: new FormControl(0),
    puntaCorte1: new FormControl(0),
    puntaCorte2: new FormControl(0),
  });

  constructor(
    private fb: FormBuilder,
    private adminSrv: AdminService
  ) { }

  // addProgram() {
  //   this.adminSrv.addProgram(this.formPonderado.value).subscribe(
  //     (resp: any) => {
  //       console.log(resp);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  public campoNoValido(campo: string): boolean {
    if (this.formPonderado.get(campo)?.invalid && this.formPonderado.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
