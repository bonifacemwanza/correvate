import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { catchError, forkJoin, map, of, throwError } from "rxjs";
import {
  CreateProfile,
  Profile,
  UserLogin,
} from "src/app/models/proflie.model";
import { Login } from "src/app/ngxs/actions/actions";
import { BaseviewComponent } from "src/app/shared/baseview/baseview";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent extends BaseviewComponent implements OnInit {
  public errors: string[] = [];
  public registerDetails: CreateProfile = {
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    userStatus: 0,
    password_confirm: "",
  };
  public loginDetails: UserLogin = {
    username: "",
    password: "",
  };
  public login_tab: boolean = true;

  constructor(
    private router: Router,
    private store: Store,
    private api: AuthService
  ) {
    super();
  }


  ngOnInit() {

  }

  async login() {
    if(this.loginDetails.password == "" || this.loginDetails.username == ""){
      this.errors.push("username can not be empty")
      return 
    }
    const sub$ = forkJoin([
      this.api.loginUser(this.loginDetails),
      this.api.getUser(this.loginDetails.username),
    ])
      .pipe(
        catchError(() => { return of([]); }
        ),
        map(([loginResponse, validationResponce]) => {
          let sessionId = '';
          console.log(loginResponse, validationResponce)
          let isUserLogged = false;
          if (validationResponce && loginResponse) {
            sessionId = loginResponse.message.split(':')[1];
            isUserLogged = true;
          }
          
          return { session: { isLoggedIn: isUserLogged, sessionId: sessionId }, userProfile: validationResponce }


        }),
        catchError(() => {
          return of([{ session: undefined, userProfile: undefined }]);
        }),
      )
      .subscribe((data) => {
        console.log("login faile", data)
        this.validateLogin(data)
      }
      );

    this.subs.push(sub$)

  }

  validateLogin(data: any) {
    if (data.session == undefined || data.userProfile == undefined) {
      this.errors.push("login in failed, check our user name or password")
    } else {
      this.store.dispatch(new Login({ ...data.userProfile, ...data.session }))
      localStorage.setItem('profile', JSON.stringify({ ...data.userProfile, ...data.session }));
      this.router.navigate([`/pets`]);
    }
  }
  async createAccount() {
    if (
      this.registerDetails.password_confirm == this.registerDetails.password
    ) {
      this.api
        .createUser(this.registerDetails)
        .pipe()
        .subscribe((data) => {
          this.login_tab = true;
        });
    }
  }

}
