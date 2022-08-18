import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PetState } from 'src/app/ngxs/state/state';
import { AuthServiceStub } from 'src/app/shared/helpers/pet.service.mock';
import { PetsComponent } from '../pets/pets.component';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';


export const SOME_DESIRED_STATE: any = {
  pets: []
  ,
  profile: {}
};


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store;
  let registerDetails = 
  {
      "email": "cbmkboniface@gmail.com",
      "password": "asda",
      "username": "mwanza",
      "firstName": "Boniface",
      "lastName": "Mwanza",
      "phone": "798989597979",
      "userStatus": 0,
      "password_confirm": "asda"
  }
  let loginDetails = {
    username: 'mwanza',
    password: 'password'
  }
  const initialState = {
    pets: {
      pets: [],
      profile: {}
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        PetsComponent

      ],
      providers: [
        AuthService,
        { provide: AuthService, useClass: AuthServiceStub },
        HttpTestingController,
        NgModule

      ],
      imports: [
        NgxsModule.forRoot([PetState]),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path:'pets', component:PetsComponent}
        ])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      pet: SOME_DESIRED_STATE
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have login form active', () => {
    expect(component.login_tab).toBeTrue();
  });
  it('should have empty intial form data', () => {
    expect(component.loginDetails.password).toEqual('');
    expect(component.loginDetails.username).toEqual('');
  });

  it('should create user', () => {
   
    component.login_tab = false;
    component.registerDetails = registerDetails
    component.createAccount()
    fixture.detectChanges();
    expect(component.login_tab).toBeTrue();
  });
  it('should fail on false login username', () => {
   
    component.login_tab = true;
    component.loginDetails = {username: ' ', password:''}
    component.login()
    fixture.detectChanges();
    const errorDisplayed = fixture.nativeElement.querySelector(".error_log");
    expect(errorDisplayed.innerText).toBe("username can not be empty")
    expect(component.errors.length).toBeGreaterThan(0);
  });

  it('should login user on correct login username', () => {
   
    component.login_tab = true;
    component.loginDetails = loginDetails;
    component.login()
    fixture.detectChanges();
    fixture.whenStable();
    expect(component.errors.length).toEqual(0);
  });
  
  afterEach(() =>{
    fixture.destroy();
  })



});
