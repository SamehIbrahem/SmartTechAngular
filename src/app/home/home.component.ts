import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../core/services/student.service';
import { Student } from '../core/models/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  students: Student[] = null;
  showStudentDetails = false;
  student: Student = null;
  constructor(config: NgbCarouselConfig, private _studentService: StudentService) {
    config.interval = 1000;
  }

  ngOnInit() {
    this._studentService.getStudents().subscribe(data => {
      this.students = data;
      this.students = this.students.map((e) => {
        e.imageName = `https://picsum.photos/900/500?random&t=${e.id}`;
        return e;
      });
      console.log(this.students);

    }, error => {
      console.error(error);
    }
    )
  }

  studentClick(id: number) {
    this.student = this.students.find(e => e.id == id);
    this.showStudentDetails = true;
  }

  onStudentDeleted(id: number) {
    this.students = this.students.filter(e => e.id != id);
    this.showStudentDetails = false;
  }

}
