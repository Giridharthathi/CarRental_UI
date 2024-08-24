import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from './models/register';
import { CarDetailsBackEndConnectivity } from './service/CarData-BackEndConnectivity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carRentalFrontEnd';
  constructor(private route:Router,private activatedRoute: ActivatedRoute
    , private navbarService:CarDetailsBackEndConnectivity) {}

  loginStatus: boolean;

  

  ngOnInit(): void {
    this.navbarService.data$.subscribe(data => {
      this.loginStatus = data;
    });
  }
  logout(){
    // this.navbarComponent.sendData(true);
    sessionStorage.clear();
    this.route.navigate(['../','land']);
  }
  // onRegister(){
    // this.route.navigate(["../register"]);    
  }
