import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private BASE_URL = 'http://localhost/v2';
  private getPetEndpoint = '/pet'
  private findByStatus = '/findByStatus'
  constructor(private http: HttpClient) { }

  getPets(status:string):Observable<any>{
    return this.http.get<any>(this.BASE_URL + this.getPetEndpoint+this.findByStatus, {params:{status:status}}).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
  deletePet(id:number):Observable<any>{
    return this.http.delete<any>(this.BASE_URL + this.getPetEndpoint+'/'+id).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
}
