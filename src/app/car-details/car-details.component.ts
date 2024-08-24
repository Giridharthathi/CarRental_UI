import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { carDetails } from '../models/car-details';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  city:string;
  carByCity:any[];
  carDetail = new Observable<carDetails[]>();

  constructor(private activatedRoute:ActivatedRoute
    , private apiCarService:CarDetailsBackEndConnectivity, private formBuilder:FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    // this.car = new carDetails();
    console.log("inside cardetails ngOnit()");    

    this.city = this.activatedRoute.snapshot.params.city;
    this.apiCarService.searchCar(this.city)
      .subscribe(data => {
        console.log(data);
        this.carByCity = data;
        // console.log(this.carDetail+"*******");
        
        // console.log(this.carByCity+"########");
      }, error => console.log(error));
  }

  selectedCar(carId:number) {
    this.route.navigate(['../../','car-details',carId], { relativeTo: this.activatedRoute })

  }
}
