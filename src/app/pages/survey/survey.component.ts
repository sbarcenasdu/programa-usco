import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  public questions: any = [];

  ngOnInit() {
    this.loadQuestions();
  }

  public surveyForm = this.fb.group({
  });

  constructor(private fb: FormBuilder, private surveySrv: SurveyService) { }

  public registerSurvey() {
    this.surveySrv.realiceSurvey(this.surveyForm.value);
  }

  loadQuestions() {
    this.surveySrv.loadJSON().subscribe(data => {
      this.questions = data;
      this.questions.forEach((question: { required: any; }, index: number) => {
        const fieldName = `pregunta${index + 1}`;
        const validators = question.required ? [Validators.required] : [];
        this.surveyForm.addControl(fieldName, this.fb.control('', validators));
      });
    });


  }
}

