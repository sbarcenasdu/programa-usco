import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent {
  constructor(
    private fb: FormBuilder,
    private surveySrv: SurveyService,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({});
  }

  questions: Array<any> = [];

  ngOnInit() {
    this.loadQuestions();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  public surveyForm = this.fb.group({
  });


  // public registerSurvey() {
  //   this.surveySrv.realiceSurvey(this.surveyForm.value);
  // }

  registerSurvey() {
    console.log(this.surveyForm.value);
    const transformedData = Object.values(this.surveyForm.value).map((value: any) => {
      const { program, option } = value;
      return { carrera: program, puntaje: 5 - parseFloat(option) };
    });
    console.log(transformedData);
    this.surveySrv.realiceSurvey(transformedData).subscribe(
      (response: any) => {
        const porcentajes: Array<any> = [];
        const carreras: Array<any> = [];
        for (const element of response) {
          porcentajes.push(element.porcentaje);
          carreras.push(element.carrera);
        }
        this.surveySrv.porcentajes = porcentajes;
        this.surveySrv.carreras = carreras;
        this.surveySrv.dataSurvey = response;
        Swal.fire('Éxito', 'Encuesta enviada exitosamente', 'success');
        setTimeout(() => {
          this.router.navigateByUrl('/home/charts');
        }, 800);

      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al enviar la encuesta', 'error');
      }
    );
  }


  loadQuestions() {
    this.surveySrv.loadJSON().subscribe((data: any) => {
      this.questions = data;
      for (const question of data) {
        const fieldName = `question${question.id}`;
        this.surveyForm.addControl(fieldName, this.fb.control('', Validators.required));
      }
      // data.forEach((question: { required: any; }, index: number) => {
      //   const fieldName = `question${index + 1}`;
      //   this.surveyForm.addControl(fieldName, this.fb.control('', [Validators.required]));
      // });
    });
  }

  public campoNoValido(campo: string): boolean {
    if (this.surveyForm.get(campo)?.invalid && this.surveyForm.get(campo)?.touched) {
      return true;
    }
    else {
      return false;
    }
  }


}

