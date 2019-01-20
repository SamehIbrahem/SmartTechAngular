import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/core/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  pageTitle: string = 'Student Detail';
  @Input() student: Student;
  @Output() deleted = new EventEmitter<number>();
  constructor(private _studentService: StudentService, private router: Router) { }

  ngOnInit() {

  }
  onDeleteClick() {
    this._studentService.deleteStudentById(this.student.id).subscribe(data => {
      this.deleted.emit(this.student.id);
    }, error => console.log(error));
  }
}
