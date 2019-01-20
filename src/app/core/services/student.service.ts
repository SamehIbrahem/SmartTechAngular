import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { Student } from '../models/student.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService extends ApiService {

    constructor(private _injector: Injector) {
        super(_injector);
        this.apiUrl = environment.studentApiUrl;
    }

    getStudents(): Observable<Student[]> {
        return super.get<Student[]>('');
    }
    addStudent(student: Student): Observable<Student> {
        return super.post<Student>('add', student)
    }
    getStudentById(id: number): Observable<Student> {
        return super.get<Student>('', `id=${id}`);
    }

    deleteStudentById(id: number): Observable<boolean> {
        return super.get<boolean>('delete', `id=${id}`);
    }

    updateStudent(student: Student): Observable<Student> {
        return super.post<Student>('edit', student);
    }

}