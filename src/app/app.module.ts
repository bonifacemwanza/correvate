import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PetsComponent } from './pages/pets/pets.component';
import { ViewComponent } from './dialogs/view/view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from './pages/create/create.component';
import { AuthComponent } from './pages/auth/auth.component';
import { EditComponent } from './pages/edit/edit.component';

import { NgxsModule } from '@ngxs/store';
import { PetState } from './ngxs/state/state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FilterComponent } from './dialogs/filter/filter.component';
import { BaseviewComponent } from './shared/baseview/baseview';

@NgModule({
  declarations: [
    BaseviewComponent,
    AppComponent,
    PetsComponent,
    ViewComponent,
    CreateComponent,
    AuthComponent,
    EditComponent,
    FilterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgxsModule.forRoot([
      PetState
    ]),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
