import { ApiService } from './api.service';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Faculty } from '../models/faculty.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacultyService extends ApiService {

    constructor(private _injector: Injector) {
        super(_injector);
        this.apiUrl = environment.facultyApiUrl;
    }
    
    getFaculties(): Observable<Faculty[]> {
        return super.get<Faculty[]>('');
    }
}