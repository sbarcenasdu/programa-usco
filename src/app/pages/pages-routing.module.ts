import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { ChartsComponent } from './charts/charts.component';
import { ImportantInfoComponent } from './important-info/important-info.component';

const routes: Routes = [{
  path:'home', component: PagesComponent,
  children:[
    {path: '', component: HomeComponent},
    {path: 'survey', component: SurveyComponent},
    {path: 'simulator', component: SimulatorComponent},
    {path: 'charts', component: ChartsComponent},
    {path: 'important-info', component: ImportantInfoComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
