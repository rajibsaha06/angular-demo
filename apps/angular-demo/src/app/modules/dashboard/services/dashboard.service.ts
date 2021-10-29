import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from 'apps/angular-demo/src/actions';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { Students } from '../models/dashboard.interface';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private _http: HttpClient,
    private sharedService: SharedService
  ) {}

  /**
   * Get Students
   * @param none
   * @returns Observable<Students[]>.
   */
  getStudents(): Observable<Students[]> {
    return this.sharedService.getData(
      'homeGrid',
      this._http
        .get<Students[]>(
          `${environment.apiBaseUrl}${environment.apiPath}${Actions.GET_STUDENTS}.json`
        )
        .pipe(
          take(1),
          map((res: any) => {
            return res?.data;
          })
        )
    );
  }

  /**
   * Set Student
   * @param formData Students
   * @returns Observable<Students>.
   */
  setStudent(formData: Students): Observable<Students> {
    return this._http
      .post<Students>(
        `${environment.apiBaseUrl}${environment.apiPath}${Actions.SET_STUDENT}.json`,
        formData
      )
      .pipe(
        tap(() => {
          this.sharedService.updateRowStore('homeGrid', formData);
        }),
        map((res: any) => {
          return res?.data;
        })
      );
  }

  /**
   * Get Students
   * @param none
   * @returns Observable<Students[]>.
   */
  //  getStudents(): Observable<Students[]> {
  //   return this._http
  //     .get<Students[]>(
  //       `${environment.apiBaseUrl}${environment.apiPath}${Actions.GET_STUDENTS}.json`
  //     )
  //     .pipe(
  //       map((res: any) => {
  //         return res?.data;
  //       })
  //     );
  // }

  /**
   * Set Student
   * @param formData Students
   * @returns Observable<Students>.
   */
  // setStudent(formData: Students): Observable<Students> {
  //   return this._http
  //     .post<Students>(
  //       `${environment.apiBaseUrl}${environment.apiPath}${Actions.SET_STUDENT}.json`,
  //       formData
  //     )
  //     .pipe(
  //       map((res: any) => {
  //         return res?.data;
  //       })
  //     );
  // }
}
