import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IStudent } from '../models/student.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService extends ApiService {

    constructor(private _injector: Injector) {
        super(_injector);
        this.apiUrl = environment.studentApiUrl;
    }

    getStudents(): Observable<IStudent[]> {
        return super.get<IStudent[]>('');
    }
    addStudent(student: IStudent) {
        super.post<IStudent>('add', student)
    }
    getStudentById(id: number): Observable<IStudent> {
        return super.get<IStudent>('', `id=${id}`);
    }

    deleteStudentById(id: number): Observable<boolean> {
        return super.get<boolean>('delete', `id=${id}`);
    }

    updateStudent(student: IStudent): Observable<IStudent> {
        return super.post<IStudent>('edit', student);
    }

}