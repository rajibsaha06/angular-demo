import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private api =
    'http://api.weatherstack.com/current?access_key=4c1280b261837133536ddeec24186502';

  constructor(private _http: HttpClient) {}

  /**
   * Get Data
   * @param location string
   * @returns Observable<any>.
   */
  getData(location: string): Observable<any> {
    return this._http.get<any>(`${this.api}&query=${location}`);
  }
}
