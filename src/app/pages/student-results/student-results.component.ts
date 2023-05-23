import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent {

  searchTerm: string = '';
  studentData: any;

  constructor(
    private adminSrv: AdminService,
    private router: Router
  ) { }

  searchData() {
    this.adminSrv.getStudentData(this.searchTerm).subscribe(
      (resp: any) => {
        if (resp.length === 0) {
          Swal.fire('No se encontraron resultados', '', 'info');
          return;
        }
        this.studentData = resp;
        localStorage.setItem('studentData', JSON.stringify(resp));
        this.router.navigateByUrl('home/charts');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Ocurrió un error al obtener los datos', 'error');
      }
    );
  }
}
