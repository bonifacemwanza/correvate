import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PetState } from 'src/app/ngxs/state/state';
import { CreateServiceStub } from 'src/app/shared/helpers/pet.service.mock';
import { CreateService } from '../create/create.service';
import { PetsComponent } from '../pets/pets.component';

import { EditComponent } from './edit.component';

export const SOME_DESIRED_STATE: any = {
  pets: []
  ,
  profile: {}
};

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let store: Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
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
    fixture = TestBed.createComponent(EditComponent);
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
});
