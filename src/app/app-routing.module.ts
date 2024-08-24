import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UserHistoryComponent } from './user-history/user-history.component';

const routes: Routes = [
  {path:'', redirectTo:"/land",pathMatch:'full'},
  {path:"land", component:LandingPageComponent},
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", component:AdminPageComponent},
  {path:"home", component:UserhomeComponent},
  {path:"update/:carId", component:UpdateCarComponent},
  {path:"car-details/:carId", component:CarDetailComponent},
  {path:"history/:userId", component:UserHistoryComponent},
  {path:"car-details-city/:city", component:CarDetailsComponent},
  {path:"**", component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
