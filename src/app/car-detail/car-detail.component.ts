import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { carDetails } from '../models/car-details';
import { AdminSearchUserNames } from '../service/admin-search-user';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';
import { dateValidator } from '../validations/dateValidation';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carId:number;
  car:any;
  carDetail:any;    
  userId:string;
  allCarDetails = new Observable<carDetails[]>();
  totalDays: any;
  carBookDateForm: FormGroup;
  carByCity:any;// = new Observable<carDetails[]>();
  // today = new Date().toISOString().slice(0, 10);

  ngOnInit(): void {
    console.log("inside cardetails ngOnit()");    
    this.userId = sessionStorage.getItem('userId');
    console.log(this.userId+'From SessionStroage*****');
    
    this.carId = this.activatedRoute.snapshot.params.carId;
    this.carDetail = this.apiCarService.getParicularCarDetails(this.carId)
      .subscribe(data => {
        console.log(data[0]);
        this.car = data[0];
        console.log(this.car);
      }, error => console.log(error));

      window.onload = function () {
        var fromDate = new Date().toISOString().split('T')[0];
        document.getElementsByName("fromDate")[0].setAttribute('min', fromDate);
      }
  
      window.onload = function () {
        var toDate = new Date().toISOString().split('T')[0];
        document.getElementsByName("toDate")[0].setAttribute('min', toDate);
      }
  }
  // carBookDateForm =this.formBuilder.group({});

  formErrors = {
    fromDate: '',
    toDate: ''
  };
  validationErrorMessages = {
    fromDate: {
      required: 'From Date field is empty'
    },
    toDate: {
      required: 'To Date field is empty',
      dateInvalid: 'Please check the Entered Dates'
    }
  };


  constructor(private activatedRoute: ActivatedRoute, private apiCarService: CarDetailsBackEndConnectivity,
     private apiService: Router, private formBuilder: FormBuilder,
     private apiUserDetailsSearch:AdminSearchUserNames) {
    this.carBookDateForm = this.formBuilder.group({
      fromDate: ['',[Validators.required]],
      toDate: ['',[Validators.required]],
      userId:[''],
      carId:[''],
      payment:[''],
      days:['']
      // CarId, UserId, Payment, FromDate, Days
    });

    this.carBookDateForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.carBookDateForm);
      this.calculateDaysExcludingWeekends(this.carBookDateForm.value)
    })
  }

  showCarDetail(carId: number) {
    console.log("inside show car details method");
    this.apiService.navigate(['../', 'car-details', carId], { relativeTo: this.activatedRoute });
  }


  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach(
      (key: string) => {
        const obj = group.get(key);
        if (obj instanceof FormGroup) {
          this.logValidationErrors(obj);
        } else {
          this.formErrors[key] = '';
          if (obj && obj.invalid && obj.touched) {
            const messages = this.validationErrorMessages[key];
            for (const errorKey in obj.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }

            }
          }
        }
      }
    );
  }

  calculateDaysExcludingWeekends(dateForm: any) {
    console.log(dateForm);

    const oneDay = 24 * 60 * 60 * 1000;
    let startDate = dateForm.fromDate;
    let endDate = dateForm.toDate;
    console.log(endDate + " end");
    console.log(startDate + " start");

    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      this.totalDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)) + 1;
      console.log(this.totalDays + "totalDays");
    }
  }
  // rentCar(){
  //   console.log(this.carBookDateForm.value);
  //   // let num: number = Number(str);  parseInt(str);
  //   let userId:number = parseInt(this.userId);
  //   // let carId:number = parseInt(this.carId);
  //   this.carBookDateForm.patchValue({
  //     userId : userId,
  //     carId:this.carId,
  //     payment: this.totalDays * this.car.price,
  //     days:this.totalDays
  //   });
  //   console.log(this.carBookDateForm.value+"inside rent car method***");
  //   this.apiCarService.insertOrderDetails(this.carBookDateForm.value); 
  // }
  rentCar(){
    let userId:number = parseInt(this.userId);
    console.log("Patch Value");
    this.carBookDateForm.patchValue({      
      userId : userId,
      carId:this.carId,
      payment: this.totalDays * this.car.price,
      days:this.totalDays
    });
    console.log(this.carBookDateForm.value+"Inside car Rental method")
    this.apiUserDetailsSearch.insertOrderDetails(this.carBookDateForm.value)
      .subscribe(
        response => {
          // Handle the response here if needed
          console.log(response);
        },
        error => {
          // Handle errors here
          console.error(error);
        }
      );
  }
}
