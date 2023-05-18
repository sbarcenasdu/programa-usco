import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { ChartsComponent } from './charts/charts.component';
import { ImportantInfoComponent } from './important-info/important-info.component';
import { EditChartsComponent } from './edit-charts/edit-charts.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentResultsComponent } from './student-results/student-results.component';
import { EditCareerComponent } from './edit-career/edit-career.component';
import { EditTestComponent } from './edit-test/edit-test.component';

const routes: Routes = [{
  path:'home', component: PagesComponent,
  children:[
    {path: '', component: HomeComponent},
    {path: 'survey', component: SurveyComponent},
    {path: 'simulator', component: SimulatorComponent},
    {path: 'charts', component: ChartsComponent},
    {path: 'important-info', component: ImportantInfoComponent},
    {path: 'edit-chart', component: EditChartsComponent},
    {path: 'admin-edit', component: AdminEditComponent},
    {path: 'student-list', component: StudentListComponent},
    {path: 'student-results', component: StudentResultsComponent},
    {path: 'edit-career', component: EditCareerComponent},
    {path: 'edit-test', component: EditTestComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
