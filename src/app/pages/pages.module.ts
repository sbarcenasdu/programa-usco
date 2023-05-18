import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { SurveyComponent } from './survey/survey.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { ChartsComponent } from './charts/charts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImportantInfoComponent } from './important-info/important-info.component';
import { EditChartsComponent } from './edit-charts/edit-charts.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentResultsComponent } from './student-results/student-results.component';
import { EditCareerComponent } from './edit-career/edit-career.component';
import { EditTestComponent } from './edit-test/edit-test.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    SurveyComponent,
    SimulatorComponent,
    ChartsComponent,
    ImportantInfoComponent,
    EditChartsComponent,
    AdminEditComponent,
    StudentListComponent,
    StudentResultsComponent,
    EditCareerComponent,
    EditTestComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
