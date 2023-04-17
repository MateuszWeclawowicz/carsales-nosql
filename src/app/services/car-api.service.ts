import { Injectable } from '@angular/core';
import { ICar } from '../interfaces/car';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  constructor(private _http : HttpClient) { }
  private _siteURL = environment.apiURL;

  getCarDetails(): Observable<any> {
    return this._http.get<ICar>(this._siteURL, { withCredentials: true })
      .pipe(
        tap(data => console.log('car data/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addCarDetails(car: ICar): Observable<any> {
    return this._http.post<ICar>(this._siteURL, car, { withCredentials: true })
      .pipe(
        tap(data => console.log('add car message/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delCarDetails(carId: string): Observable<any> {
    let deleteURL = this._siteURL + ":" + carId;
    return this._http.delete(deleteURL, { withCredentials: true })
      .pipe(
        tap(data => console.log('del car message/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return err.message;
  }

}
