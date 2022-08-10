import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private getPetEndpoint = '/pet'
  private findByStatus = '/findByStatus'
  constructor(private http: HttpClient) { }

  getPets(status:string):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/v2'+this.getPetEndpoint+this.findByStatus, {params:{status:status}}).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
  deletePet(id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/v2'+this.getPetEndpoint+'/'+id).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
}
