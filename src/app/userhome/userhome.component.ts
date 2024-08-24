import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { carDetails } from '../models/car-details';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';
import { dateValidator } from '../validations/dateValidation';
import { AdminSearchUserNames } from '../service/admin-search-user';
import { BackendConnectivityService } from '../service/backendconnectivity.service';
import { error } from 'console';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  allCarDetails = new Observable<carDetails[]>();
  userId:string;
  totalDays: any;
  dateData: FormGroup;
  myAccountForm:FormGroup;
  user:any;
  carByCity:any;// = new Observable<carDetails[]>(); 

  constructor(private activatedRoute: ActivatedRoute, private apiCarService: CarDetailsBackEndConnectivity,
     private apiService: Router, private formBuilder: FormBuilder,
      private apiUser:BackendConnectivityService) {
    this.dateData = this.formBuilder.group({
      city: [''],
      // dates: this.formBuilder.group({
      fromDate: [''],
      toDate: ['']
      // })
    }, { validator: dateValidator });
    this.myAccountForm = this.formBuilder.group({
      mail:['',Validators.required],
      phoneNumber:['',Validators.required], 
      userId:['']
    })

    this.dateData.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.dateData);
      this.calculateDaysExcludingWeekends(this.dateData.value)
    })
  }

  ngOnInit(): void {
    
    this.allCarDetails = this.apiCarService.getAllCarDetails();
    this.userId = sessionStorage.getItem('userId');
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // c?\onst user = JSON.parse(userString);
    console.log(this.user.userId+"&*&*&*&*&*&*&");

    window.onload = function () {
      var currentDate = new Date().toISOString().split('T')[0];
  
      // Set minimum date for "fromDate" input
      var fromDateInput = document.getElementsByName("fromDate")[0];
      fromDateInput.setAttribute('min', currentDate);
  
      // Set minimum date for "toDate" input
      var toDateInput = document.getElementsByName("toDate")[0];
      toDateInput.setAttribute('min', currentDate);
  } 
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
                //console.log(this.formErrors[key]);
              }

            }
          }
        }
      }
    );
  }
  formErrors = {
    city: '',
    fromDate: '',
    toDate: '',
    mail:'',
    phoneNumber:''
  };
  validationErrorMessages = {
    City: {
      required: 'City field is empty'
    },
    fromDate: {
      required: 'From Date field is empty'
    },
    toDate: {
      required: 'To Date field is empty',
      dateInvalid: 'Please check the Entered Dates'
    },
    mail: {
      required: 'Email field is empty'
    },
    phoneNumber: {
      required: 'Phone Number field is empty'
    }
  };

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
  selectDate() {
    this.apiService.navigate(['../','car-details-city',this.dateData.value.city], { relativeTo: this.activatedRoute })
  }
  yourOrders(){
    console.log("Inside the orders method");
    this.apiService.navigate(['../','history',this.userId], { relativeTo: this.activatedRoute });
    // this.apiUserDetailsSearch.gettingUserOrderHistory(this.userId);
  }
  setUpdateValue(){
    console.log(this.user.mail+"&&&&"+this.user.phoneNumber+"*****")
    this.myAccountForm.setValue({
      mail:this.user.mail,
      phoneNumber:this.user.phoneNumber,
      userId:this.user.userId
    }) 
   
  }
  update(){
    this.apiUser.update(this.myAccountForm.value).subscribe(
      data=>{
        if(data.status === 200){
          console.log("updated");
        }
      },
      error=>
      console.log(error)
    )
  }
}
