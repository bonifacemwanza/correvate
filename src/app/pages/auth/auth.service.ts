import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  CreateProfile,
  Profile,
  UserLogin,
} from "src/app/models/proflie.model";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private BASE_URL = "http://localhost/v2";
  private createUserEndpoint = "/user";
  private loginUserEndpoint = "/login";
  constructor(private http: HttpClient) {}

  createUser(data: CreateProfile): Observable<any> {
    return this.http
      .request<any>("post", environment.apiUrl+'/v2' + this.createUserEndpoint, {
        body: data,
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  loginUser(data: UserLogin): Observable<any> {
    return this.http
      .get<any>(
        environment.apiUrl+'/v2' + this.createUserEndpoint + this.loginUserEndpoint,
        { params: data as any }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  getUser(data:string): Observable<any> {
    return this.http
      .get<any>(
        environment.apiUrl+'/v2'+ this.createUserEndpoint  +'/'+data
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
