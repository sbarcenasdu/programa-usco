import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-important-info',
  templateUrl: './important-info.component.html',
  styleUrls: ['./important-info.component.css']
})
export class ImportantInfoComponent {
  constructor(
    private router: Router
  ) {}
 
}
