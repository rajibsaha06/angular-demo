import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from 'apps/angular-demo/src/actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Students } from '../models/dashboard.interface';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  /**
   * Get Students
   * @param none
   * @returns Observable<Students[]>.
   */
  getStudents(): Observable<Students[]> {
    return this._http
      .get<Students[]>(
        `${environment.apiBaseUrl}${environment.apiPath}${Actions.GET_STUDENTS}.json`
      )
      .pipe(
        map((res: any) => {
          return res?.data;
        })
      );
  }
}
