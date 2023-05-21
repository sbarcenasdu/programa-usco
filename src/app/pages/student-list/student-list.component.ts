import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  constructor(
    private adminSrv: AdminService,
    private router: Router
  ) {
  }

  students = Array<any>();

  ngOnInit() {
    this.getAllStudents();
  }

  public getAllStudents() {
    this.adminSrv.getAllStudents().subscribe(
      (response: any) => {
        console.log(response);
        this.students = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
}

