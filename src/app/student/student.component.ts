import { Component, OnInit } from '@angular/core';
import { StudentService } from '../core/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private _studentService: StudentService) { }

  ngOnInit() {
    this._studentService.getStudents().subscribe(data => {
      console.log(data);

    }, error => {
      console.error(error);
    })
  }

}
