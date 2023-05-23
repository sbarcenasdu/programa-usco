import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-charts',
  templateUrl: './edit-charts.component.html',
  styleUrls: ['./edit-charts.component.css']
})

export class EditChartsComponent {

  constructor(
    private fb: FormBuilder,
    private adminSrv: AdminService
  ) {
    this.modalForm = this.fb.group({
      title: ['', Validators.required],
      lecturaCritica: [0, Validators.required],
      cienciasNaturales: [0, Validators.required],
      cienciasSociales: [0, Validators.required],
      matematicas: [0, Validators.required],
      ingles: [0, Validators.required],
      puntaCorte1: [0, Validators.required],
      puntaCorte2: [0, Validators.required],
      faculty: ['f4b13c51-f8e6-401e-a476-7472bc5b9bcd']
    });
  }

  public modalForm: FormGroup;
  public formPonderado = this.fb.group({
  });

  ngOnInit(): void {
    this.getCareers();
  }

  public careers: any = [];

  //***** funciones

  getCareers() {
    this.adminSrv.getCareers().subscribe(
      (resp: any) => {
        this.careers = resp;
        console.log(resp);
        for (let i = 0; i < resp.length; i++) {

          const fieldName1 = `lecturaCritica${i + 1}`
          this.formPonderado.addControl(fieldName1, this.fb.control((resp[i].lecturaCritica*100 ).toFixed(2), Validators.required));
          const fieldName2 = `cienciasNaturales${i + 1}`;
          this.formPonderado.addControl(fieldName2, this.fb.control((resp[i].cienciasNaturales * 100).toFixed(2), Validators.required));
          const fieldName3 = `cienciasSociales${i + 1}`;
          this.formPonderado.addControl(fieldName3, this.fb.control((resp[i].cienciasSociales * 100).toFixed(2), Validators.required));
          const fieldName4 = `matematicas${i + 1}`;
          this.formPonderado.addControl(fieldName4, this.fb.control((resp[i].matematicas * 100).toFixed(2), Validators.required));
          const fieldName5 = `ingles${i + 1}`;
          this.formPonderado.addControl(fieldName5, this.fb.control((resp[i].ingles * 100).toFixed(2), Validators.required));
          const fieldName6 = `puntajePonderado${i + 1}`;
          this.formPonderado.addControl(fieldName6, this.fb.control(resp[i].puntajePonderado, Validators.required));
          const fieldName7 = `puntaCorte1${i + 1}`;
          this.formPonderado.addControl(fieldName7, this.fb.control(resp[i].puntaCorte1, Validators.required));
          const fieldName8 = `puntaCorte2${i + 1}`;
          this.formPonderado.addControl(fieldName8, this.fb.control(resp[i].puntaCorte2, Validators.required));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addCareer() {
    console.log(this.modalForm.value);
    this.adminSrv.addCareer(this.modalForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        Swal.fire('Éxito', 'Carrera agregada exitosamente', 'success');
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCareer(careerData: any, i: number) {
    Swal.fire({
      title: 'Confirmar acción',
      text: '¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminSrv.updateCareer(careerData, this.formPonderado.value, i).subscribe(
          (resp: any) => {
            console.log(resp);
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  deleteCareer(careerID: any) {
    console.log(careerID);
    Swal.fire({
      title: 'Confirmar acción',
      text: '¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminSrv.deleteCareer(careerID).subscribe(
          (resp: any) => {
            console.log(resp);
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  isEditModeEnabled: boolean = false;
  headers: string[] = ['ÁREA', 'Lectura Crítica', 'Ciencias Naturales', 'Ciencias Sociales', 'Matemáticas', 'Inglés', 'Su Puntaje Ponderado', 'Puntaje de Cierre 2022-II', 'Puntaje de Cierre 2023-I'];

  enableEditMode() {
    this.isEditModeEnabled = true;
  }

  saveHeaders() {
    // Aquí puedes realizar la lógica para guardar los nombres de los encabezados en tu base de datos
    console.log(this.headers);
    this.isEditModeEnabled = false;
  }

  public invalidField(campo: string): boolean {
    return (this.formPonderado.get(campo)?.invalid && this.formPonderado.get(campo)?.touched) ? true : false;
  }
}
