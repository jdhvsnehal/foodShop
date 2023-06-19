import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { DishesComponent } from 'src/app/components/dishes/dishes.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent},
  { path : 'signup', component: SignupComponent},
  { path : 'cart', component: CartComponent},
  { path : '', redirectTo : '/login', pathMatch : 'full'},
  { path : 'menu', component: DishesComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
