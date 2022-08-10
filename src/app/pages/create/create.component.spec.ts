import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PetState } from 'src/app/ngxs/state/state';
import { CreateServiceStub } from 'src/app/shared/helpers/pet.service.mock';
import { PetsComponent } from '../pets/pets.component';

import { CreateComponent } from './create.component';
import { CreateService } from './create.service';

export const SOME_DESIRED_STATE: any = {
  pets: []
  ,
  profile: {}
};

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let store: Store;

  let createPet = new CreateServiceStub().createNewPetdata();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CreateComponent,

      ],
      providers: [
        CreateService,
        { provide: CreateService, useClass: CreateServiceStub },
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
    fixture = TestBed.createComponent(CreateComponent);
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

  it('should render title', () => {
 
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(document.querySelector('.form'))
    expect(compiled.querySelector('.create_pet')?.textContent).toContain('Create Pet');
  });
  it('should log error on empty form submission', () => {

    component.savePet()
    fixture.detectChanges();
    const errorDisplayed = fixture.nativeElement.querySelector(".error_log");
    expect(errorDisplayed.innerText).toBe("pets and categories can not be empty")
    expect(component.errors.length).toBeGreaterThan(0);
  });

  it('should create pet with data', () => {
    component.petData = createPet
    component.savePet()
    fixture.detectChanges();
    expect(component.errors.length).toBe(0);
  });

  afterEach(() =>{
    fixture.destroy();
  })
});
