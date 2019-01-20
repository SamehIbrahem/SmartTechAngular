import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/core/models/faculty.model';
import { FacultyService } from 'src/app/core/services/faculty.service';
import { Student } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/core/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  faculties: Faculty[] = null;
  student: Student = new Student();
  submitted: boolean = false;
  alertClosed: boolean = false;
  editStudent: boolean = false;
  imgURL: any;
  imageErrorMessage: string;

  constructor(private _facultyService: FacultyService, private _studentService: StudentService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.editStudent = true;
      this._studentService.getStudentById(id).subscribe(data => this.student = data);
    }
    this._facultyService.getFaculties().subscribe(data => this.faculties = data);
  }
  onSubmit() {
    if (this.editStudent) {
      this._studentService.updateStudent(this.student).subscribe(data => {
        this.submitted = true;
      });
    }
    else {
      this._studentService.addStudent(this.student).subscribe(data => {
        this.submitted = true;
      });
    }

  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.imageErrorMessage = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.student.imageName = files[0].name;
    }
  }

}
