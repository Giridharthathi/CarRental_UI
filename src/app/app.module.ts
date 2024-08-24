import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { FooterComponent } from './footer/footer.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UserHistoryComponent } from './user-history/user-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterComponent,
    PagenotfoundComponent,
    LoginComponent,
    UserhomeComponent,
    AdminPageComponent,
    UpdateCarComponent,
    FooterComponent,
    CarDetailComponent,
    CarDetailsComponent,
    UserHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
