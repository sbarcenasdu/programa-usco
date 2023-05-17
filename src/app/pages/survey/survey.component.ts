import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { Router } from '@angular/router';


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

  importantInfo: boolean = true;
  
  continueTest(){
    this.importantInfo = false;
  }


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
    const transformedData = Object.values(this.surveyForm.value).map((value: any) => {
      const { question, option, program } = value;
      return { pregunta: question, respuesta: 5 - parseFloat(option), carrera: program };
    });
    this.surveySrv.realiceSurvey(transformedData);//no se si queda pendiente a respuesta del api
    console.log('Encuesta registrada correctamente.');
    // this.router.navigateByUrl('/charts');
    this.router.navigate(['/home/charts']);
  }

  loadQuestions() {
    this.surveySrv.loadJSON().subscribe(data => {
      this.questions = data;
      this.questions.forEach((question: { required: any; }, index: number) => {
        const fieldName = `question${index + 1}`;
        const validators = question.required ? [Validators.required] : [];
        this.surveyForm.addControl(fieldName, this.fb.control('', validators));
      });
      this.totalPages = this.getTotalPages();
      this.totalQuestions = this.questions.length;
    });
  }
}

