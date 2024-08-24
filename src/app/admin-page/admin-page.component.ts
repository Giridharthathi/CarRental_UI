import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { carDetails } from '../models/car-details';
import { AdminSearchUserNames } from '../service/admin-search-user';
import { BackendConnectivityService } from '../service/backendconnectivity.service';
import { CarDetailsBackEndConnectivity } from '../service/CarData-BackEndConnectivity';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  allCarDetails;// = new Observable<any[]>();
  adminMail:any;
  carUsedUserDetails:any;
  carData:carDetails;
  carRegisterForm: FormGroup;
  search:FormGroup;
  car:any;
  isUserTable:boolean = false;
  showMessage:boolean = false;

  constructor(private formBuilder: FormBuilder, private route: Router,
    private apiCarService: CarDetailsBackEndConnectivity, private activateRoute: ActivatedRoute
    ,private apiUserDetailsSearch:AdminSearchUserNames) {
    this.carRegisterForm = this.formBuilder.group({
      carName: ['', [Validators.required]],
      model: ['', [Validators.required]],
      airBags: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      fuelType: ['', [Validators.required]],
      fuelCapacity: ['', [Validators.required]],
      kmsDriven: ['', Validators.required],
      carType: ['', [Validators.required]],
      registrationNumber: ['', Validators.required],
      transmission: ['', Validators.required],
      price: ['', Validators.required],
      rating:['0'],
      ownerMailId:['', Validators.required],
      city: ['', Validators.required]
    });

    //Car Search Form
    this.search = this.formBuilder.group({
      searchCar: ['', [Validators.required]],
    });



    this.carRegisterForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.carRegisterForm);
    });
    this.search.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.search);
    });

  }
  ngOnInit() {
    this.apiCarService.sendData(false);
    this.adminMail = sessionStorage.getItem('adminMail');
  }

  formErrors = {
    carName: '',
    model: '',
    seats: '',
    fuelCapacity: '',
    airBags: '',
    fuelType: '',
    carType: '',
    registrationNumber: '',
    transmission: '',
    kmsDriven: '',
    ownerMailId:'',
    price: '',
    city: '',
    searchCar:''
  };
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
  validationErrorMessages = {
    carName: {
      required: 'Car Name field is empty'
    },
    model: {
      required: 'Model field is empty'
    },
    seats: {
      required: 'seats field is empty'
    },
    fuelCapacity: {
      required: 'fuelCapacity field is empty'
    },
    airBags: {
      required: 'airbags field is empty'
    },
    fuelType: {
      required: 'fuelType field is empty'
    },
    carType: {
      required: 'carType field is empty'
    },
    registrationNumber: {
      required: 'password field is empty'
    },
    transmission: {
      required: 'password field is empty'
    },
    kmsDriven: {
      required: 'kmsDriven field is empty'
    },
    price: {
      required: 'price field is empty'
    },
    city: {
      required: 'city field is empty'
    },
    searchCar:{
      required:'Field is required to search'
    }
  }
  // updateCar(carId:number) {
  //   this.apiCarService.updateCar(carId, this.carRegisterForm.value)
  //     .subscribe(
  //       data => {
  //         console.log("inside updatre methid");
          
  //         console.log(data+"----------")
  //         Swal.fire(
  //           'Nice!',
  //           'The product has been updated!',
  //           'success'
  //         )
  //       },
  //       error => console.log(error));
  //   this.car = new carDetails();
  //   this.route.navigate(['/admin']);
  // }
  isHidden:boolean =false;
  navBar:boolean = false;
  carInsertForm:boolean= false;

  carDetailsData:any;

  getAllDetails(){
    this.isHidden = true;
    this.carInsertForm= false;
    this.navBar = true;

    console.log("fdggadhsaf");
    this.allCarDetails= this.apiCarService.getAllCarDetails();        
  }
  deleteCar(carId:number){
    Swal.fire({ 
          title: 'Do you want remove it?', 
          text: "You won't be able to revert this!", 
          icon: 'warning', 
          showCancelButton: true, 
          confirmButtonColor: '#3085d6', 
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes, remove it!' 
        }).then((result) => { 
          if (result.isConfirmed) { 
            Swal.fire( 
              'Removed!', 
              'Your item has been removed.',
              'success'
            ) 
            this.apiCarService.deleteCar(carId).subscribe( 
              (data)=> 
              { 
                this.getAllDetails() 
              },
              error =>{ console.log(error)});
            
          } 
        }) 
      };
  displayListOfCar() {
    console.log("Calling list of car details after deletion");
    this.route.navigate(['/admin']);
  }

  insertForm(){
    this.isHidden= false;
    this.carInsertForm = true;
    this.navBar = true;
  }
  updateCar(carId:number){
    this.route.navigate(['../','update',carId])
  }
 
  insertCar(){
    console.log("Inside Insert car method");    
    this.apiCarService.insertCar(this.carRegisterForm.value)
      .subscribe(
        data => {
          console.log(data);
             Swal.fire({
              title: "Registration Successful",
              text: "Please login to continue",
              icon: "success"
            }).then(()=>this.route.navigate(['../','/admin']));
            
        },
        error => { Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Already exist !",
          footer: '<button routerLink="/register">Register</button>'
        });
      });
  }
  searchCar(){
    this.isHidden = true;
    // this.isHidden = false;
    this.carInsertForm= false;
    this.navBar = true;
    this.isUserTable=false;
    this.allCarDetails = this.apiCarService.searchCar(this.search.value.searchCar);
    if(this.allCarDetails.length === 0){
      this.isHidden=false;
      this.showMessage = true;
    }
    else{
      this.isHidden = true;
      this.showMessage = false;
    }
  }
  searchUser(carId:number){
    console.log(carId);
    
    this.carUsedUserDetails = this.apiUserDetailsSearch.getCarUsedUserDetails(carId);
     console.log(this.carUsedUserDetails);
    
    this.isHidden = false;
    this.carInsertForm= false;
    this.navBar = true;
    this.isUserTable=true;
  }
  
}