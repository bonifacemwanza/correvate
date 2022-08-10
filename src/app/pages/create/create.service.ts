import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private BASE_URL = 'http://localhost/v2';
  private getPetEndpoint = '/pet'
  constructor(private http: HttpClient) { }

  createPet(data:object):Observable<any>{
    return this.http.post<any>(this.BASE_URL + this.getPetEndpoint, data).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
}