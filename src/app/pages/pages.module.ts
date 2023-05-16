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

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    SurveyComponent,
    SimulatorComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
