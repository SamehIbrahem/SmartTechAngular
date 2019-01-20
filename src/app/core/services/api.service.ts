import { Injectable, Injector, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/** an interface for http calls
 * @export
 * @class ApiService
 */
export abstract class ApiService {
    /**
     * Base Api Url
     *
     * @protected
     * @memberof ApiService
     */
    protected apiUrl = '';
    _http: HttpClient;
    _router: Router;

    constructor(private injector: Injector) {
        this._http = injector.get(HttpClient);
        this._router = injector.get(Router);
    }

    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     * @memberof ApiService
     */
    private formatErrors(error: any) {
        if (error.status === 401) {
            this._router.navigate(['login']);
        }
        return throwError(error.error);
    }
    /**
     * get() generic http get method
     *
     * @template T
     * @param {string} path
     * @param {HttpParams} [params=null]
     * @returns {Observable<T>}
     * @memberof ApiService
     */
    get<T>(path: string, params = null): Observable<T> {
        params = new HttpParams({ fromString: params });
        const headers = this.buildCommonHeader();
        return this._http.get<T>(`${this.apiUrl}${path}`, { headers, params }).pipe(
            tap(
                data => data,
                error => error
            ), catchError((err: any) => this.formatErrors(err)));
    }
    /**
     * post() generic http post method
     *
     * @template T
     * @param {string} path
     * @param {any} body
     * @param {HttpParams} [params=null]
     * @returns {Observable<T>}
     * @memberof ApiService
     */
    post<T>(path: string, body: any, params = null): Observable<T> {
        params = new HttpParams({ fromString: params });
        const headers = this.buildCommonHeader();
        return this._http.post<T>(`${this.apiUrl}${path}`, body, { headers, params }).pipe(
            tap(
                data => data,
                error => error
            ), catchError((err: any) => this.formatErrors(err)));
    }

    private buildCommonHeader(): HttpHeaders {
        return new HttpHeaders({});
    }
}
