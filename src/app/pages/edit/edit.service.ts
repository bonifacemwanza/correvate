import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditService {

  private BASE_URL = 'http://localhost/v2';
  private getPetEndpoint = '/pet'
  private findByStatus = '/findByStatus'
  constructor(private http: HttpClient) { }

  updatePet(data:object):Observable<any>{
    return this.http.put<any>(this.BASE_URL + this.getPetEndpoint, data).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
}

