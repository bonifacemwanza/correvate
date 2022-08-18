import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { PetState } from 'src/app/ngxs/state/state';
import { PetServiceStub } from 'src/app/shared/helpers/pet.service.mock';

import { PetsComponent } from './pets.component';
import { PetsService } from './pets.service';


export const SOME_DESIRED_STATE: any = {
  pets: []
  ,
  profile: {}
};

describe('PetsComponent', () => {
  let component: PetsComponent;
  let fixture: ComponentFixture<PetsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsComponent ],
      providers: [
        PetsService,
        { provide: PetsService, useClass: PetServiceStub },
        HttpTestingController,
        NgModule

      ],
      imports: [
        NgxsModule.forRoot([PetState]),
        ReactiveFormsModule,
        MatDialogModule,
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
    fixture = TestBed.createComponent(PetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component)
  });

  it('populates from store to should be 3', () => {
    expect(component.petData.length).toEqual(3);
  });
  it('filter category', () => {
    component.filter_data = {  name: "",
    category: "",
    status: "pending",}
    component.applyFilter()
    expect(component.petData.length).toEqual(1);
    expect(component.petData[0].status).toEqual("pending");
  });
});
