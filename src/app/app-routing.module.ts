import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { PetsComponent } from './pages/pets/pets.component';
import { AuthGuard } from './shared/helpers/auth.guard';

const routes: Routes = [
  {
    path: "pets",
    component: PetsComponent, canActivate: [AuthGuard]
  },
  {
    path: "create",
    component: CreateComponent, canActivate: [AuthGuard]
  },
  {
    path: "edit/:id",
    component: EditComponent, canActivate: [AuthGuard]
  },
  {
    path: "",
    component: AuthComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
