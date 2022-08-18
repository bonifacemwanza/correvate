import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EditService {

  private getPetEndpoint = '/pet'
  constructor(private http: HttpClient) { }

  updatePet(data:object):Observable<any>{
    return this.http.put<any>(environment.apiUrl+'/v2'+this.getPetEndpoint, data).pipe(
      catchError(error => {
       return throwError(error)
      })
    );
  }
}

