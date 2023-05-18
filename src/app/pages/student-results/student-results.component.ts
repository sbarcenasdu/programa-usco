import { Component } from '@angular/core';

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent {


  students: any[] = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'Michael Johnson' },
    { name: 'Emily Davis' },
    { name: 'David Brown' }
  ];

  filteredStudents: any[] = [];
  searchText: string = '';

  search() {
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
