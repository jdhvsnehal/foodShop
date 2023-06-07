import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { DishesComponent } from 'src/app/components/dishes/dishes.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent},
  { path : 'signup', component: SignupComponent},
  { path : '', redirectTo : '/login', pathMatch : 'full'},
  { path : 'dishes', component: DishesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
