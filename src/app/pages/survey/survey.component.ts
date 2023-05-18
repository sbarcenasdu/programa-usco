import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  p: number = 1;
  public questions: any = [];
  pageSize: number = 10;
  totalPages: number = 0;
  totalQuestions: number = 0;
  selectedOptions: any[] = [];
  dataSurvey: any[] = [];

  public getTotalPages() {
    return Math.ceil(this.questions.length / this.pageSize);
  }

  ngOnInit() {
    this.loadQuestions();
  }

  public surveyForm = this.fb.group({
  });

  constructor(private fb: FormBuilder, private surveySrv: SurveyService, private router: Router) { }

  // public registerSurvey() {
  //   this.surveySrv.realiceSurvey(this.surveyForm.value);
  // }

  registerSurvey() {
    console.log(this.surveyForm.value);
    const transformedData = Object.values(this.surveyForm.value).map((value: any) => {
      const { question, option, program } = value;
      return { carrera: program, puntaje: 5 - parseFloat(option) };
    });
    console.log(transformedData);

    this.surveySrv.realiceSurvey(transformedData).subscribe(
      (response) => {
        this.dataSurvey = Array(response);
        const porcentajes: Array<any> = [];
        const carreras: Array<any> = [];
        for (let index = 0; index < this.dataSurvey[0].length; index++) {
          const element = this.dataSurvey[0][index];
          porcentajes.push(element.porcentaje);
          carreras.push(element.carrera);
        }
        console.log(porcentajes);
        this.surveySrv.porcentajes = porcentajes;
        this.surveySrv.carreras = carreras;
        this.surveySrv.dataSurvey = this.dataSurvey[0];
        this.router.navigateByUrl('/home/charts');
        Swal.fire('Éxito', 'Encuesta enviada exitosamente', 'success');
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
      this.questions.forEach((question: { required: any; }, index: number) => {
        const fieldName = `question${index + 1}`;
        this.surveyForm.addControl(fieldName, this.fb.control('', [Validators.required]));
      });
      this.totalPages = this.getTotalPages();
      this.totalQuestions = this.questions.length;
    });


  }


}

