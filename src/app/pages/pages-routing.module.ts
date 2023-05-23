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
import { GlobalChartComponent } from './global-chart/global-chart.component';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: PagesComponent,
    //canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
      { path: 'simulator', component: SimulatorComponent },
      { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
      { path: 'important-info', component: ImportantInfoComponent },
      { path: 'edit-charts', component: EditChartsComponent, canActivate: [AdminGuard] },
      { path: 'admin-edit', component: AdminEditComponent, canActivate: [AdminGuard] },
      { path: 'student-list', component: StudentListComponent, canActivate: [AdminGuard] },
      { path: 'student-results', component: StudentResultsComponent, canActivate: [AdminGuard] },
      { path: 'edit-career', component: EditCareerComponent, canActivate: [AdminGuard] },
      { path: 'edit-test', component: EditTestComponent, canActivate: [AdminGuard] },
      { path: 'global-chart', component: GlobalChartComponent, canActivate: [AdminGuard] },
    ]
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
